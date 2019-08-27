import Vue, { VueConstructor } from 'vue';
import { Data, SetupFunction, SetupContext } from './component';
import { currentVue } from './runtimeContext';
import { install } from './install';
import { mixin } from './setup';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    setup?: SetupFunction<Data, Data>;
  }
}
/**
 * 
 * @param Vue 
 * 将mixin 作为install 第二个参数: export function install(Vue: VueConstructor, _install: (Vue: VueConstructor) => void) {
 */
const _install = (Vue: VueConstructor) => install(Vue, mixin);
const plugin = {
  install: _install,
};
// Auto install if it is not done yet and `window` has `Vue`.
// To allow users to avoid auto-installation in some cases,
if (currentVue && typeof window !== 'undefined' && window.Vue) {
  _install(window.Vue);
}

export default plugin;
export { default as createElement } from './createElement';
export { SetupContext };
export { createComponent, PropType } from './component';

export * from './apis/state';
export * from './apis/lifecycle';
export * from './apis/watch';
export * from './apis/computed';
export * from './apis/inject';
