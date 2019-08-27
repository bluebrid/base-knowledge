import { VueConstructor } from 'vue';
import { ComponentInstance } from '../component';
import { getCurrentVue } from '../runtimeContext';
import { ensureCurrentVMInFn } from '../helper';

const genName = (name: string) => `on${name[0].toUpperCase() + name.slice(1)}`;
function createLifeCycle(lifeCyclehook: string) {
  return (callback: Function) => {
    const vm = ensureCurrentVMInFn(genName(lifeCyclehook));
    injectHookOption(getCurrentVue(), vm, lifeCyclehook, callback);
  };
}

function createLifeCycles(lifeCyclehooks: string[], name: string) {
  return (callback: Function) => {
    const currentVue = getCurrentVue();
    const vm = ensureCurrentVMInFn(name);
    lifeCyclehooks.forEach(lifeCyclehook =>
      injectHookOption(currentVue, vm, lifeCyclehook, callback)
    );
  };
}

function injectHookOption(Vue: VueConstructor, vm: ComponentInstance, hook: string, val: Function) {
  const options = vm.$options as any;
  const mergeFn = Vue.config.optionMergeStrategies[hook];
  // 只是将Vue的生命周期放在setup中维护.
  /**
   * 1. val 就是我们在setup 中调用对应生命周期函数传递的回调函数：
   *  onMounted(() => {
      console.log('component is mounted!')
    })
     2. 将setup 中对应的生命周期函数进行合并
   */
  options[hook] = mergeFn(options[hook], val);
}

// export const onCreated = createLifeCycle('created');
export const onBeforeMount = createLifeCycle('beforeMount');
export const onMounted = createLifeCycle('mounted');
export const onBeforeUpdate = createLifeCycle('beforeUpdate');
export const onUpdated = createLifeCycle('updated');
export const onBeforeUnmount = createLifeCycle('beforeDestroy');
// only one event will be fired between destroyed and deactivated when an unmount occurs
export const onUnmounted = createLifeCycles(['destroyed', 'deactivated'], genName('unmounted'));
export const onErrorCaptured = createLifeCycle('errorCaptured');
export const onActivated = createLifeCycle('activated');
export const onDeactivated = createLifeCycle('deactivated');
