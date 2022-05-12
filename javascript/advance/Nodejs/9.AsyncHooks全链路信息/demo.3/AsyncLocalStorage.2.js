const asyncHooks = require('async_hooks');
const { executionAsyncResource, AsyncResource } = asyncHooks;

class AsyncLocalStorage {
  constructor() {
    this.kResourceStore = Symbol('kResourceStore');
    this.enabled = false;
    const ctx = this;
    this.hooks = asyncHooks.createHook({
      init(asyncId, type, triggerAsyncId, resource) {
        const currentResource = executionAsyncResource();
        ctx._propagate(resource, currentResource)
      }
    });
  }

  // Propagate the context from a parent resource to a child one
  _propagate(resource, triggerResource) {
    const store = triggerResource[this.kResourceStore];
    if (store) {
      resource[this.kResourceStore] = store;
    }
  }

  _enable() {
    if (!this.enabled) {
      this.enabled = true;
      this.hooks.enable();
    }
  }

  enterWith(store) {
    this._enable();
    const resource = executionAsyncResource();
    resource[this.kResourceStore] = store;
  }

  run(store, callback) {
      // AsyncResource 可以用来自定义异步资源
    const resource = new AsyncResource('AsyncLocalStorage', {
      requireManualDestroy: true,
    });
    return resource.emitDestroy().runInAsyncScope(() => {
      this.enterWith(store);
      return callback();
    });
  }

  getStore() {
    return executionAsyncResource()[this.kResourceStore];
  }
}

module.exports = AsyncLocalStorage;