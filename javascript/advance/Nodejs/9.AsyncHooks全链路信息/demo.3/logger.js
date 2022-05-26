const { v4: uuidV4 } = require('uuid');
const AsyncLocalStorage = require('./AsyncLocalStorage.2');
// Nodejs 13.10 内部实现了AsyncLocalStorage类
// const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();
const logger = {
  info: (...args) => {
    const traceId = asyncLocalStorage.getStore();
    console.log(traceId, ...args);
  },
  run: (req, callback) => {
    asyncLocalStorage.run(req.headers.requestId || uuidV4(), callback);
  }
}

module.exports = {
  logger,
}