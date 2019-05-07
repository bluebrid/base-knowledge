const { AsyncParallelHook } = require("../../lib");

const myAsyncParallelHook = new AsyncParallelHook(["name", "age"]);
console.time("cost");
myAsyncParallelHook.tapPromise("1", function(name) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log(1, name);
			reject();
		}, 1000);
	});
});

myAsyncParallelHook.tapPromise("2", function(name) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log(2, name);
			resolve();
		}, 2000);
	});
});

myAsyncParallelHook.tapPromise("3", function(name) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log(3, name);
			resolve();
		}, 3000);
	});
});
myAsyncParallelHook.promise("liu").then(
	function() {
		console.log("ok");
		console.timeEnd("cost");
	},
	function() {
		console.log("error");
		console.timeEnd("cost");
	}
);

/**
 * AsyncParallelHook
1. 如果tapPromise注册事件， 则回调函数必须是一个Promise 对象，因为如果cb 返回的对象没有then 属性， 是直接会报错的
2. 在Promise对象中，必须要执行resolve,或者reject, 否则在执行promise的回调函数永远都不会执行，因为在生成的函数中是在resolve 函数中进行counter 的处理
3. 如果任何一个注册事件报错或者执行reject ,不会中断其他没有执行的事件，但是会立即进入promise的then

 (function anonymous(name, age
) {
	"use strict";
	return new Promise((_resolve, _reject) => {
		var _sync = true;
		var _context;
		var _x = this._x;
		do {
			var _counter = 3;
			var _done = () => {
				_resolve();
			};
			if (_counter <= 0) break;
			var _fn0 = _x[0];
			var _hasResult0 = false;
			var _promise0 = _fn0(name, age);
			if (!_promise0 || !_promise0.then)
				throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
			_promise0.then(_result0 => {
				_hasResult0 = true;
				if (--_counter === 0) _done();
			}, _err0 => {
				if (_hasResult0) throw _err0;
				if (_counter > 0) {
					if (_sync)
						_resolve(Promise.resolve().then(() => { throw _err0; }));
					else
						_reject(_err0);
					_counter = 0;
				}
			});
			if (_counter <= 0) break;
			var _fn1 = _x[1];
			var _hasResult1 = false;
			var _promise1 = _fn1(name, age);
			if (!_promise1 || !_promise1.then)
				throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
			_promise1.then(_result1 => {
				_hasResult1 = true;
				if (--_counter === 0) _done();
			}, _err1 => {
				if (_hasResult1) throw _err1;
				if (_counter > 0) {
					if (_sync)
						_resolve(Promise.resolve().then(() => { throw _err1; }));
					else
						_reject(_err1);
					_counter = 0;
				}
			});
			if (_counter <= 0) break;
			var _fn2 = _x[2];
			var _hasResult2 = false;
			var _promise2 = _fn2(name, age);
			if (!_promise2 || !_promise2.then)
				throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise2 + ')');
			_promise2.then(_result2 => {
				_hasResult2 = true;
				if (--_counter === 0) _done();
			}, _err2 => {
				if (_hasResult2) throw _err2;
				if (_counter > 0) {
					if (_sync)
						_resolve(Promise.resolve().then(() => { throw _err2; }));
					else
						_reject(_err2);
					_counter = 0;
				}
			});
		} while (false);
		_sync = false;
	});

})
 */