/**
 * https://www.codercto.com/a/21587.html
 */
const { AsyncParallelHook } = require("../../lib");

const mySyncHook = new AsyncParallelHook(["name", "age"]);

mySyncHook.tap("name1", (name, age) => {
	console.log(name, age, "name1");
	return "wrong"; // 不关心返回值 这里写返回值对结果没有任何影响
});

mySyncHook.tap("name2", (name, age) => {
	console.log(name, age, "name2");
	throw Error("Name2 throw a error");
});

mySyncHook.tap("name13", (name, age) => {
	console.log(name, age, "name3");
});

mySyncHook.callAsync("Ivan Fan", "18", err => {
	if (err) {
		console.log(err.message);
	} else {
		console.log("Over");
	}
});
/**
 调用call 执行的时候，最终根据上面tap 注册的事件(都保存在taps中)，生成如下的匿名函数:
 从下面的代码可知，5.AsyncParallelHook  类型的钩子,如果注册的是同步事件(tap注册)，
 所有的事件都是同步执行的，不过等到所有事件都执行完成后， 才会出发回调函数，如果有任何一个事件发生错误，也会执行回调函数，并且传递一个error 的参数，
 且后面的事件都不会继续执行
 (function anonymous(name, age, _callback
) {
	"use strict";
	var _context;
	var _x = this._x;
	do {
		var _counter = 3;
		var _done = () => {
			_callback();
		};
		if (_counter <= 0) break;
		var _fn0 = _x[0];
		var _hasError0 = false;
		try {
			_fn0(name, age);
		} catch (_err) {
			_hasError0 = true;
			if (_counter > 0) {
				_callback(_err);
				_counter = 0;
			}
		}
		if (!_hasError0) {
			if (--_counter === 0) _done();
		}
		if (_counter <= 0) break;
		var _fn1 = _x[1];
		var _hasError1 = false;
		try {
			_fn1(name, age);
		} catch (_err) {
			_hasError1 = true;
			if (_counter > 0) {
				_callback(_err);
				_counter = 0;
			}
		}
		if (!_hasError1) {
			if (--_counter === 0) _done();
		}
		if (_counter <= 0) break;
		var _fn2 = _x[2];
		var _hasError2 = false;
		try {
			_fn2(name, age);
		} catch (_err) {
			_hasError2 = true;
			if (_counter > 0) {
				_callback(_err);
				_counter = 0;
			}
		}
		if (!_hasError2) {
			if (--_counter === 0) _done();
		}
	} while (false);

})
 */
