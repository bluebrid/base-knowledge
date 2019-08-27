import { AnyObject } from './types/basic';
import { hasSymbol, hasOwn, isPlainObject, assert } from './utils';
import { isRef } from './reactivity';
import { setCurrentVue, currentVue } from './runtimeContext';
import { VueConstructor } from 'vue';

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to: AnyObject, from?: AnyObject): Object {
  if (!from) return to;
  let key: any;
  let toVal: any;
  let fromVal: any;

  const keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') continue;
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      to[key] = fromVal;
    } else if (
      toVal !== fromVal &&
      (isPlainObject(toVal) && !isRef(toVal)) &&
      (isPlainObject(fromVal) && !isRef(toVal))
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

export function install(Vue: VueConstructor, _install: (Vue: VueConstructor) => void) {
  if (currentVue && currentVue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      assert(false, 'already installed. Vue.use(plugin) should be called only once');
    }
    return;
  }
  // 在初始化Vue的时候， 会执行Vue.prototype._init -> mergeOptions -> mergeField -> 
  /**
   *  var strats = config.optionMergeStrategies;
   *  
    function mergeField(key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
   */
  Vue.config.optionMergeStrategies.setup = function(parent: Function, child: Function) {
    return function mergedSetupFn(props: any, context: any) {
      return mergeData(
        typeof child === 'function' ? child(props, context) || {} : {},
        typeof parent === 'function' ? parent(props, context) || {} : {}
      );
    };
  };
  /**
   * 1. 将当前的Vue对象保存在全局变量中 runtimeContext.ts
   * 2. 每次 ensureCurrentVMInFn 获取的就是在这里保存的Vue对象
  */
  setCurrentVue(Vue);
  // 执行_install 函数， 
  /**
   * _install 是在index.ts 传递的const _install = (Vue: VueConstructor) => install(Vue, mixin);
   * 相当于执行mixin (import { mixin } from './setup';)
   */
  _install(Vue);
}
