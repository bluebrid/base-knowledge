/* @flow */

import { _Vue } from '../install'
import type Router from '../index'
import { inBrowser } from '../util/dom'
import { runQueue } from '../util/async'
import { warn, isError } from '../util/warn'
import { START, isSameRoute } from '../util/route'
import {
  flatten,
  flatMapComponents,
  resolveAsyncComponents
} from '../util/resolve-components'

export class History {
  router: Router;
  base: string;
  current: Route;
  pending: ?Route;
  cb: (r: Route) => void;
  ready: boolean;
  readyCbs: Array<Function>;
  readyErrorCbs: Array<Function>;
  errorCbs: Array<Function>;

  // implemented by sub-classes
  +go: (n: number) => void;
  +push: (loc: RawLocation) => void;
  +replace: (loc: RawLocation) => void;
  +ensureURL: (push?: boolean) => void;
  +getCurrentLocation: () => string;

  constructor (router: Router, base: ?string) {
    this.router = router
    this.base = normalizeBase(base)
    // start with a route object that stands for "nowhere"
    // 设置默认的current 的路由
    this.current = START
    this.pending = null
    this.ready = false
    this.readyCbs = []
    this.readyErrorCbs = []
    this.errorCbs = []
  }

  listen (cb: Function) {
    this.cb = cb
  }

  onReady (cb: Function, errorCb: ?Function) {
    if (this.ready) {
      cb()
    } else {
      this.readyCbs.push(cb)
      if (errorCb) {
        this.readyErrorCbs.push(errorCb)
      }
    }
  }

  onError (errorCb: Function) {
    this.errorCbs.push(errorCb)
  }

  transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // 根据location: /bar 去匹配对应的路由
    // match定义在/src/index 中
    const route = this.router.match(location, this.current)
    this.confirmTransition(route, () => {
      // 去更新路由, 其实主要是更新Vue实例上的_route属性
      this.updateRoute(route)
      onComplete && onComplete(route)
      this.ensureURL()

      // fire ready cbs once
      if (!this.ready) {
        this.ready = true
        this.readyCbs.forEach(cb => { cb(route) })
      }
    }, err => {
      if (onAbort) {
        onAbort(err)
      }
      if (err && !this.ready) {
        this.ready = true
        this.readyErrorCbs.forEach(cb => { cb(err) })
      }
    })
  }

  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    const abort = err => {
      if (isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => { cb(err) })
        } else {
          warn(false, 'uncaught error during route navigation:')
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) { 
      /**
       * 如果是相同的路由，就直接中断不会再往下执行
       */
      this.ensureURL()
      return abort()
    }

    const {
      updated,
      deactivated,
      activated
    } = resolveQueue(this.current.matched, route.matched)
    // 获取所有的守护函数
    const queue: Array<?NavigationGuard> = [].concat(
      // 组件内的Leave 守护(beforeRouteLeave)
      /*
       const Foo = {
        data () {
          return { saved: false }
        },
        template: `
          <div>
            <p>baz ({{ saved ? 'saved' : 'not saved' }})</p>
            <button @click="saved = true">save</button>
          </div>
        `,
        beforeRouteLeave (to, from, next) {
          if (this.saved || window.confirm('Not saved, are you sure you want to navigate away?')) {
            next()
          } else {
            next(false)
          }
        }
      }
       */
      extractLeaveGuards(deactivated),
      // 全局的beforeEach守护
      /*
       router.beforeEach((to, from, next) => {
        console.log('beforeEach', to, from)
        next()
      })
       */
      this.router.beforeHooks,
      // 组件内的Update 守护(beforeRouteUpdate)
      extractUpdateHooks(updated),
      // 在配置中的beforeEnter守护
      /*
       const router = new VueRouter({
          mode: 'history',
          base: __dirname,
          linkActiveClass: 'active-link',
          routes: [
            {
              path: '/foo',
              component: Foo,
              beforeEnter (to, from, next) {
                console.log('Config beforeEnter', to, from)
                next()
              }
            },
            { path: '/bar', component: Bar },
            { path: '/é', component: Unicode }
          ]
        })
       */
      activated.map(m => m.beforeEnter),
      // async components
      // VueRouter 内置的守护
      resolveAsyncComponents(activated)
    )
    // 将要到达的route 保存在pending 中
    this.pending = route
    const iterator = (hook: NavigationGuard, next) => {
      // 如果pending 不等于route 直接执行abort函数， 执行完所有的hook后，就会将pedding 给置为null,也就是在
      if (this.pending !== route) {
        return abort()
      }
      try {
        // 执行指定的守护函数
        hook(route, current, (to: any) => {
          if (to === false || isError(to)) {
            // next(false) -> abort navigation, ensure current URL
            /**
             * 1. 如果在执行守护的时候，传递的是false, 则中断导航
             * 2. 下面的next 就是我们上面执行 hook(route, current, (to: any) => {}), 传递的第三个参数(函数)
             *  router.beforeEach((to, from, next) => {
                  console.log('beforeEach', to, from)
                  next(false)
                })
             */
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' && (
              typeof to.path === 'string' ||
              typeof to.name === 'string'
            ))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort()
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
    // 运行所有的队列
    /**
     * export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
        const step = index => {
          if (index >= queue.length) {
            cb() // 递归调用执行完成所有的queue后执行回调函数
          } else {
            if (queue[index]) {
              fn(queue[index], () => { // 通过iterator 函数来运行queue
                step(index + 1)
              })
            } else {
              step(index + 1)
            }
          }
        }
        step(0) // 执行第一个
      }

     */
    runQueue(queue, iterator, () => {
      const postEnterCbs = []
      const isValid = () => this.current === route
      // 组件内Enter的守护(beforeRouteEnter)
      /**
       const Foo = {
        data () {
          return { saved: false }
        },
        template: `
          <div>
            <p>baz ({{ saved ? 'saved' : 'not saved' }})</p>
            <button @click="saved = true">save</button>
          </div>
        `,
        beforeRouteEnter(to, from, next) { // const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid) 执行的是这个守护
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！获取组件实例 `this`
          // 因为当守卫执行前，组件实例还没被创建
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 `this`
          next();
        },
        beforeRouteUpdate(to, from, next) {
          // 在当前路由改变，但是该组件被复用时调用
          // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
          // 可以访问组件实例 `this`
          next();
        },
        beforeRouteLeave(to, from, next) {
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 `this`
          if (this.saved || window.confirm('Not saved, are you sure you want to navigate away?')) {
            next()
          } else {
            next(false)
          }
        }
      }
       */
      const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
      // 全局的resolveHooks 守护
      const queue = enterGuards.concat(this.router.resolveHooks)
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort()
        }
        this.pending = null
        onComplete(route) // 会去执行下面的pdateRoute 
        if (this.router.app) {
          // this.router.app.$nextTick(() => {
          //   postEnterCbs.forEach(cb => { cb() })
          // })
        }
      })
    })
  }

  updateRoute (route: Route) {
    const prev = this.current
    this.current = route
    this.router.app.log('VueRouter updateRoute', 'green')
    /**
     * cb 就是如下调用listen 的回调函数
     *   history.listen(route => {
          this.apps.forEach((app) => {
            app.log('VueRouter updateRoute Done', 'green')
            app._route = route
          })
        })
        cb 会去设置_route 的值， 而_route 是一个Reactive 对象， 在install.js 中的beforeCreate中处理的
        Vue.util.defineReactive(this, '_route', this._router.history.current)
     */
    this.cb && this.cb(route)
    // 执行VueRouter 的守护钩子函数afterHooks(afterEach)
    /**
     *router.afterEach((to, from) => {
        console.log('afterEach', to, from)
      })
     */
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, prev)
    })
  }
}

function normalizeBase (base: ?string): string {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      const baseEl = document.querySelector('base')
      base = (baseEl && baseEl.getAttribute('href')) || '/'
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '')
    } else {
      base = '/'
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current: Array<RouteRecord>,
  next: Array<RouteRecord>
): {
  updated: Array<RouteRecord>,
  activated: Array<RouteRecord>,
  deactivated: Array<RouteRecord>
} {
  let i
  const max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records: Array<RouteRecord>,
  name: string,
  bind: Function,
  reverse?: boolean
): Array<?Function> {
  const guards = flatMapComponents(records, (def, instance, match, key) => {
    const guard = extractGuard(def, name)
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(guard => bind(guard, instance, match, key))
        : bind(guard, instance, match, key)
    }
  })
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def: Object | Function,
  key: string
): NavigationGuard | Array<NavigationGuard> {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def)
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated: Array<RouteRecord>): Array<?Function> {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated: Array<RouteRecord>): Array<?Function> {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard: NavigationGuard, instance: ?_Vue): ?NavigationGuard {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated: Array<RouteRecord>,
  cbs: Array<Function>,
  isValid: () => boolean
): Array<?Function> {
  return extractGuards(activated, 'beforeRouteEnter', (guard, _, match, key) => {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard: NavigationGuard,
  match: RouteRecord,
  key: string,
  cbs: Array<Function>,
  isValid: () => boolean
): NavigationGuard {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, cb => {
      next(cb)
      if (typeof cb === 'function') {
        cbs.push(() => {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid)
        })
      }
    })
  }
}

function poll (
  cb: any, // somehow flow cannot infer this is a function
  instances: Object,
  key: string,
  isValid: () => boolean
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key])
  } else if (isValid()) {
    setTimeout(() => {
      poll(cb, instances, key, isValid)
    }, 16)
  }
}
