'use strict';

var asap = require('./raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._deferredState = 0;
  // 设置初始化Promise的状态是0, 也就是pendding 
  this._state = 0;
  this._value = null;
  this._deferreds = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._onHandle = null;
Promise._onReject = null;
Promise._noop = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop); // then 创建一个新的Promise 对象
  /**
   * function Handler(onFulfilled, onRejected, promise){
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }
   */
  const deferred = new Handler(onFulfilled, onRejected, res)
  handle(this, deferred); // 创建一个Handler的对象， 里面保存了then里面传递进来的onReject, onResolve 函数，并且保存了新生成的Promise 实例对象
  // this._deferreds = deferred;
  return res; // then 返回的是一个新的promise 对象
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (Promise._onHandle) {
    Promise._onHandle(self);
  }
  if (self._state === 0) {
    if (self._deferredState === 0) {
      self._deferredState = 1; // 将deferredState 变更为1，
      self._deferreds = deferred; // 在新生存的Promise 对象的_deferreds里面保存了Handler对象，然后退出， 
      return;
    }
    if (self._deferredState === 1) {
      self._deferredState = 2;
      self._deferreds = [self._deferreds, deferred];
      return;
    }
    self._deferreds.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  /**
   * 1. asap 通过process.nextTick(flush); 进行异步处理
   * 2. asap 传递进去的fn, 保存在一个queue 队列中， 
   * 3. 在flush 函数中，遍历所有的queue 队列进行执行
   * 4. 在queue 中通过先进先出的原则执行
   */
  asap(function() {
    // 这里形成了一个闭包， deferred 是在then里面传递进来的，deferred.promise 保存了下一个promise的配置，
    // 因为在new Promise 中执行对应的reject or resolve 的时候， 设置了对应的_state的状态为： 2， 1， 
    // 然后根据这个状态去获取保存的对应的对应的onrject , onfulfilled 函数 
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._state === 1) {
        resolve(deferred.promise, self._value);
      } else {
        reject(deferred.promise, self._value);
      }
      return;
    }
    /**
     * function tryCallOne(fn, a) { // 执行一个参数的函数，也就是执行onResolve, onReject 函数
        try {
          return fn(a);
        } catch (ex) {
          LAST_ERROR = ex;
          return IS_ERROR;
        }
      }
     */
    // 这里对应的cb 就是对应的onReject , onResolve 函数
    var ret = tryCallOne(cb, self._value); 
    if (ret === IS_ERROR) { 
      reject(deferred.promise, LAST_ERROR);
    } else {
      // 将返回值，作为resolve 的value , 如果没有返回值，则是undefined
      /**
       *  .then(
          data => {
            console.log("result: " + data);
          },
          errMsg => {
            console.log("Error message: " + errMsg);
          }
        )
       */
      // 如上，在onResolve, onReject 中没有返回值， 怎么在后面的onResolve 中没有值
      resolve(deferred.promise, ret); // 不是链式调用，而是通过闭包的原理保存了从then里面传递进来的新的promise 信息
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._state = 3;
      self._value = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._state = 1;// 将状态变更为1, 表示执行了resolve
  self._value = newValue;// 将resolve 里面传递进来的值保存起来
  finale(self);
}

function reject(self, newValue) {
  self._state = 2; // 将状态变更为2, 表示执行了reject.
  self._value = newValue;
  if (Promise._onReject) {
    Promise._onReject(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._deferredState === 1) {//
    handle(self, self._deferreds);
    self._deferreds = null;
  }
  if (self._deferredState === 2) {
    for (var i = 0; i < self._deferreds.length; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {

  var done = false;
  /**
   * function tryCallTwo(fn, a, b) {
      try {
        fn(a, b);
      } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
      }
    }
   */
  // tryCallTwo 就是去执行我们传递进来的回调函数，并且传入两个函数，也就是resolve 和reject
   /**
   * 1. fn 就是new Promise(fn) 传入的函数
   * 2. promise , 传递的就是this , 也就是new promise 的实例化对象
   * var promise = new Promise(function(resolve, reject) {
   * // setTimeout(() => {
   *   //     resolve(1000)
   *  // }, 1000 * 4)
   *      resolve(1000);
   * });
   * 3. 当执行resolve 方法的时候，其实就是执行下面的onResolve
   * 4. reject 指向的也就是下面的onReject 
   */
  var res = tryCallTwo(fn, function onResolve(value) { 
    if (done) return;
    done = true; // 标记状态已经完成
    /** 
     * 1. 这个promise 就是new Promise 创建的实例this, 
     * 2. 如果是异步，在then 中重新创建了一个新的Promise对象, 并且这个对象中的_deferreds保存了，then 中传递进来的onResolve和onReject两个方法，
    */
    resolve(promise, value); 
  }, function onReject (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}
