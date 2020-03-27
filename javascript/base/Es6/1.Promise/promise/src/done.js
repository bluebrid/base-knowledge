'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  // done 方法不返回任何对象， 所以done 后面不能在链式调用then
  // 但是finally 返回了一个新的promise 对象， 则后面可以继续链式调用promise方法。
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};
