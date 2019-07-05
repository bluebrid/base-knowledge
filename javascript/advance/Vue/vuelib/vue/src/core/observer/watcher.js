/* @flow */

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  noop
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * 创建Watcher对象 的几种情况：
 * 1. 配置了watch 属性，如：
 * watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
      }
    },
    而且每一个属性都会创建一个Watcher对象
    2. 
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    
    this.vm = vm
    if (isRenderWatcher) {
      // \src\core\instance\lifecycle.js mountComponent 方法 中创建的Watcher 对象才会传递`isRenderWatcher` 属性
      /*
          new Watcher(vm, expOrFn, noop, {
            before () {
              if (vm._isMounted) {
                callHook(vm, 'beforeUpdate')
              }
            }
          }, true )// isRenderWatcher )
      */
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      // computed 会走这个分支, 会立即执行对应的方法
      // this.getter.call(vm, vm)
      /**
       *   computed: {
            filteredTodos: function () {
              return filters[this.visibility](this.todos)
            },
            remaining: function () {
              return filters.active(this.todos).length
            },
            allDone: {
              get: function () {
                return this.remaining === 0
              },
              set: function (value) {
                this.todos.forEach(function (todo) {
                  todo.completed = value
                })
              }
            }
          },
       */
      this.getter = expOrFn
    } else {
      // watch 属性都是走这个分支
      /*
      watch: {
        todos: {
          handler: function (todos) {
            todoStorage.save(todos)
          },
          deep: true
        }
      },*/
      /**
       *vuelib\vue\src\core\util\lang.js
        const bailRE = /[^\w.$]/
        export function parsePath (path: string): any {
          if (bailRE.test(path)) {
            return
          }
          const segments = path.split('.')
          return function (obj) {
            for (let i = 0; i < segments.length; i++) {
              if (!obj) return
              obj = obj[segments[i]]
            }
            return obj
          }
        }

        this.getter.call(vm, vm)
       */
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    this.vm.log('将当前的Watcher 对象，添加到Dep Target属性')
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      this.vm.log('将当前的Watcher 对象，从Dep Target属性中移除')
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    /**
     * 1. 执行Watcher, 如果是同步的，就立即执行run 方法
     * 2. 异步的Watcher,则将其添加到队列中，异步执行
     */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      /**
       * 是同步的Watcher 则直接运行run ,不用添加到watcher 队列中去异步执行
       */
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
