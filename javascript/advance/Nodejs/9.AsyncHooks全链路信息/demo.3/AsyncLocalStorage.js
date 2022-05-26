// AsyncLocalStorage.js
const asyncHooks = require('async_hooks');
const { executionAsyncId } = asyncHooks;
class AsyncLocalStorage {
    constructor() {
        this.storeMap = new Map(); // {1}
        this.createHook(); // {2}
    }
    createHook() {
        const ctx = this;
        const hooks = asyncHooks.createHook({
            /**
             * 
             * @param {*} asyncId 异步资源唯一ID
             * @param {*} type 异步资源的类型
             * @param {*} triggerAsyncId 当前异步资源是由那个异步资源创建的异步资源ID
             * @param {*} resource 初始化的异步资源
             */
            init(asyncId, type, triggerAsyncId, resource) {
                // https://www.imooc.com/article/314713 详细说明
                if (ctx.storeMap.has(triggerAsyncId)) {
                    ctx.storeMap.set(asyncId, ctx.storeMap.get(triggerAsyncId));
                }
            },
            /**
             * 当启动异步操作或完成异步操作是，系统将会调用回调来通知用户，也就是我们的业务回调函数，在这之前会先触发before回调
             * @param {*} asyncId 
             */
            before(asyncId) {
                console.log(asyncId)
            },
            /***
             * 当asyncId 对应的异步资源被销毁时调用destory 回调，用来垃圾回收
             */
            destroy(asyncId) {
                ctx.storeMap.delete(asyncId);
            }
        });
        // 因为Promise默认是没有开启的，通过显示调用可以开启Promise的异步调用
        hooks.enable();
    }
    run(store, callback) { // {3}
        this.storeMap.set(executionAsyncId(), store);
        callback();
    }
    getStore() { // {4}
        return this.storeMap.get(executionAsyncId());
    }
}
module.exports = AsyncLocalStorage;