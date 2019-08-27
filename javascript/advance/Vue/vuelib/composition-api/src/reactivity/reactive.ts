import { AnyObject } from '../types/basic';
import { getCurrentVue } from '../runtimeContext';
import { isPlainObject, def, hasOwn, warn } from '../utils';
import { isComponentInstance, createComponentInstance } from '../helper';
import {
  AccessControlIdentifierKey,
  ReactiveIdentifierKey,
  NonReactiveIdentifierKey,
  RefKey,
} from '../symbols';
import { isRef, UnwrapRef } from './ref';

const AccessControlIdentifier = {};
const ReactiveIdentifier = {};
const NonReactiveIdentifier = {};

function isNonReactive(obj: any): boolean {
  return (
    hasOwn(obj, NonReactiveIdentifierKey) && obj[NonReactiveIdentifierKey] === NonReactiveIdentifier
  );
}

export function isReactive(obj: any): boolean {
  return hasOwn(obj, ReactiveIdentifierKey) && obj[ReactiveIdentifierKey] === ReactiveIdentifier;
}

/**
 * Proxing property access of target.
 * We can do unwrapping and other things here.
 */
function setupAccessControl(target: AnyObject): void {
  if (
    !isPlainObject(target) ||
    isNonReactive(target) ||
    Array.isArray(target) ||
    isRef(target) ||
    isComponentInstance(target)
  ) {
    return;
  }

  if (
    hasOwn(target, AccessControlIdentifierKey) &&
    target[AccessControlIdentifierKey] === AccessControlIdentifier
  ) {
    return;
  }

  if (Object.isExtensible(target)) {
    def(target, AccessControlIdentifierKey, AccessControlIdentifier);
  }
  const keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) {
    //重新定义了getter 和setter
    defineAccessControl(target, keys[i]);
  }
}

/**
 * Auto unwrapping when access property
 */
export function defineAccessControl(target: AnyObject, key: any, val?: any) {
  if (key === '__ob__') return;

  let getter: (() => any) | undefined;
  let setter: ((x: any) => void) | undefined;
  const property = Object.getOwnPropertyDescriptor(target, key);
  /**
   * 1. 先取出对应的属性的getter 和setter , 其都是在创建Vue实例的时候， 初始化data的时候给每个属性设置的getter 和setter
   */
  if (property) {
    if (property.configurable === false) {
      return;
    }
    getter = property.get;
    setter = property.set;
    if ((!getter || setter) /* not only have getter */ && arguments.length === 2) {
      val = target[key];
    }
  }

  setupAccessControl(val);
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function getterHandler() {
      const value = getter ? getter.call(target) : val;
      // if the key is equal to RefKey, skip the unwrap logic
      if (key !== RefKey && isRef(value)) {
        return value.value;
      } else {
        return value;
      }
    },
    set: function setterHandler(newVal) {
      if (getter && !setter) return;

      const value = getter ? getter.call(target) : val;
      // If the key is equal to RefKey, skip the unwrap logic
      // If and only if "value" is ref and "newVal" is not a ref,
      // the assignment should be proxied to "value" ref.
      if (key !== RefKey && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
      } else if (setter) {
        setter.call(target, newVal);
      } else if (isRef(newVal)) {
        val = newVal;
      }
      setupAccessControl(newVal);
    },
  });
}

function observe<T>(obj: T): T {
  const Vue = getCurrentVue();
  let observed: T;
  if (Vue.observable) { // Vue 新的方法， 
    observed = Vue.observable(obj);
  } else {
    // 老版本的方法就是创建一个新的Vue实例， 将对应的obj,作为创建Vue实例的data 属性， 对应的obj 就是一个可观察对象
    const vm = createComponentInstance(Vue, {
      data: {
        $$state: obj,
      },
    });
    observed = vm._data.$$state;
  }

  return observed;
}
/**
 * Make obj reactivity
 */
export function reactive<T = any>(obj: T): UnwrapRef<T> {
  if (process.env.NODE_ENV !== 'production' && !obj) {
    warn('"reactive()" is called without provide an "object".');
    // @ts-ignore
    return;
  }

  if (!isPlainObject(obj) || isReactive(obj) || isNonReactive(obj) || !Object.isExtensible(obj)) {
    return obj as any;
  }

  const observed = observe(obj);
  def(observed, ReactiveIdentifierKey, ReactiveIdentifier);
  setupAccessControl(observed);
  return observed as UnwrapRef<T>;
}

/**
 * Make sure obj can't be a reactive
 */
export function nonReactive<T = any>(obj: T): T {
  if (!isPlainObject(obj)) {
    return obj;
  }

  // set the vue observable flag at obj
  (obj as any).__ob__ = (observe({}) as any).__ob__;
  // mark as nonReactive
  def(obj, NonReactiveIdentifierKey, NonReactiveIdentifier);

  return obj;
}
