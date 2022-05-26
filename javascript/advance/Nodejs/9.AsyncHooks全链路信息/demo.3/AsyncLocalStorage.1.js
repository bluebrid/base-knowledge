const asyncHooks = require('async_hooks');
const { executionAsyncId, executionAsyncResource } = asyncHooks;

class AsyncLocalStorage {
    constructor() {
        this.createHook();
    }
    createHook() {
        const hooks = asyncHooks.createHook({
            init(asyncId, type, triggerAsyncId, resource) {
                // executionAsyncResource 返回当前执行的异步资源
                const cr = executionAsyncResource();
                if (cr) {
                    resource[asyncId] = cr[triggerAsyncId];
                }
            }
        });
        hooks.enable();
    }
    run(store, callback) {
        executionAsyncResource()[executionAsyncId()] = store;
        callback();
    }
    getStore() {
        return executionAsyncResource()[executionAsyncId()];
    }
}

module.exports = AsyncLocalStorage;