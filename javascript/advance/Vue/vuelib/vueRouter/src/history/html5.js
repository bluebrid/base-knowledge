/* @flow */

import type Router from '../index'
import { History } from './base'
import { cleanPath } from '../util/path'
import { START } from '../util/route'
import { setupScroll, handleScroll } from '../util/scroll'
import { pushState, replaceState, supportsPushState } from '../util/push-state'

export class HTML5History extends History {
  constructor (router: Router, base: ?string) {
    super(router, base)
    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      setupScroll()
    }

    const initLocation = getLocation(this.base)
   
    window.addEventListener('popstate', e => { // 监听不到pushState和replaceState
      /**
       * 1. 监听不了history的pushState和replaceState事件
       * 2. 监听浏览器的前进，后退， window.history.go 事件
       */
      const current = this.current
      this.router.app.log('browser popstate 事件', '#7EC0EE')
      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === initLocation) {
        return
      }
      // 处理VueRouter的真正跳转
      this.transitionTo(location, route => {
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    })
  }

  go (n: number) {
    window.history.go(n)
  }

  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(location, route => {
      //  pushState和replaceState是一个HTML5的新接口，他们的作用非常大，可以做到改变网址却不需要刷新页面， 所以可以控制不刷新页面，但是可以URL跳转
      // 只是视觉上实现了URL跳转，而页面的渲染，是Vue根据`_route`的变化来实现的
      pushState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(location, route => {
      replaceState(cleanPath(this.base + route.fullPath))
      handleScroll(this.router, route, fromRoute, false)
      onComplete && onComplete(route)
    }, onAbort)
  }

  ensureURL (push?: boolean) {// 确保跳转到一个安全的URL，如/
    if (getLocation(this.base) !== this.current.fullPath) { // 判断当前的URL和需要跳转的URL是否相等
      const current = cleanPath(this.base + this.current.fullPath) // 获取主页的URL(根URL)
      push ? pushState(current) : replaceState(current) // \src\util\push-state.js, 直接跳转到根URL
    }
  }

  getCurrentLocation (): string {
    return getLocation(this.base)
  }
}

export function getLocation (base: string): string {
  let path = decodeURI(window.location.pathname)
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}
