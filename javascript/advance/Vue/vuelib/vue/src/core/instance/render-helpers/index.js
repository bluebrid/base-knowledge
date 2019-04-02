/* @flow */

import { toNumber, toString, looseEqual, looseIndexOf } from 'shared/util'
import { createTextVNode, createEmptyVNode } from 'core/vdom/vnode'
import { renderList } from './render-list'
import { renderSlot } from './render-slot'
import { resolveFilter } from './resolve-filter'
import { checkKeyCodes } from './check-keycodes'
import { bindObjectProps } from './bind-object-props'
import { renderStatic, markOnce } from './render-static'
import { bindObjectListeners } from './bind-object-listeners'
import { resolveScopedSlots } from './resolve-slots'

export function installRenderHelpers (target: any) {
  
  /**
   * 重命名不同的Render 方法, 别名
   */
  target.log && target.log(`重命名不同的Rendere 方法`)
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList // render list v-or
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode // render text 
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  // vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false) vue\src\core\instance\render.js
}
