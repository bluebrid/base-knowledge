/* @flow */

import { warn } from 'core/util/index'

import {
  cached,
  isUndef,
  isTrue,
  isPlainObject
} from 'shared/util'

const normalizeEvent = cached((name: string): {
  name: string,
  once: boolean,
  capture: boolean,
  passive: boolean,
  handler?: Function,
  params?: Array<any>
} => {
  const passive = name.charAt(0) === '&'
  name = passive ? name.slice(1) : name
  const once = name.charAt(0) === '~' // Prefixed last, checked first
  name = once ? name.slice(1) : name
  const capture = name.charAt(0) === '!'
  name = capture ? name.slice(1) : name
  return {
    name,
    once,
    capture,
    passive
  }
})

export function createFnInvoker (fns: Function | Array<Function>): Function {
  function invoker () {
    const fns = invoker.fns
    if (Array.isArray(fns)) {
      const cloned = fns.slice()
      for (let i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments)
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns
  return invoker
}

export function updateListeners (
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  createOnceHandler: Function,
  vm: Component
) {
  let name, def, cur, old, event
  for (name in on) {
    def = cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
    /* istanbul ignore if */
    if (__WEEX__ && isPlainObject(def)) {
      cur = def.handler
      event.params = def.params
    }
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        `Invalid handler for event "${event.name}": got ` + String(cur),
        vm
      )
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        // cur 就是我们在render里面的函数
        /**
         *  function ($event) {
                    if (!('button' in $event) && _k($event.keyCode, "enter", 13,
                            $event.key, "Enter")) return null;
                    return addTodo($event)
                }
         */
        /**
          export function createFnInvoker (fns: Function | Array<Function>): Function {
            function invoker () {
              const fns = invoker.fns
              if (Array.isArray(fns)) {
                const cloned = fns.slice()
                for (let i = 0; i < cloned.length; i++) {
                  cloned[i].apply(null, arguments)
                }
              } else {
                // return handler return value for single handlers
                return fns.apply(null, arguments)
              }
            }
            invoker.fns = fns
            return invoker
          }
         */
        cur = on[name] = createFnInvoker(cur)
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture)
      }
      // 添加事件 src\platforms\web\runtime\modules\events.js
      add(event.name, cur, event.capture, event.passive, event.params)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      remove(event.name, oldOn[name], event.capture)
    }
  }
}
