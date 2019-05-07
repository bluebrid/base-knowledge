/**
 * https://www.codercto.com/a/21587.html
 */
const { AsyncParallelHook } = require("../../lib");

const mySyncHook = new AsyncParallelHook(["name", "age"]);

mySyncHook.tapAsync("name1", (name, age, cb) => {
	setTimeout(() => {
		console.log(name, age, "name1");
		cb();
	}, 1000);
});
mySyncHook.tapAsync("name2", (name, age, cb) => {
	setTimeout(() => {
		console.log(name, age, "name2");
		cb();
	}, 3000);
});

mySyncHook.callAsync("Ivan Fan", 11, err => {
	if (err) {
		console.log(err.message);
	} else {
		console.log("Over");
	}
});
/**
 调用call 执行的时候，最终根据上面tap 注册的事件(都保存在taps中)，生成如下的匿名函数:
 从下面的代码可知，5.AsyncParallelHook  类型的钩子,如果注册的是同步事件(tap注册)，
 所有的事件都是同步执行的，不过等到所有事件都执行完成后， 才会触发回调函数，如果有任何一个事件发生错误，也会执行回调函数，并且传递一个error 的参数，
 每个注册事件，在执行完后，必须执行cb 回调函数，相当于是告诉这个注册事件完成了,否则永远都不会执行callAsync 的回调函数
 且后面的事件都不会继续执行
(function anonymous(name, age, _callback
) {
	"use strict";
	var _context;
	var _x = this._x;
	do {
		var _counter = 2;
		var _done = () => {
			_callback();
		};
		if (_counter <= 0) break;
		var _fn0 = _x[0];
		_fn0(name, age, _err0 => {
			if (_err0) {
				if (_counter > 0) {
					_callback(_err0);
					_counter = 0;
				}
			} else {
				if (--_counter === 0) _done(); // 只有等到_counter === 0 才会执行_done(), 也就是执行回调函数
			}
		});
		if (_counter <= 0) break;
		var _fn1 = _x[1];
		_fn1(name, age, _err1 => {
			if (_err1) {
				if (_counter > 0) {
					_callback(_err1);
					_counter = 0;
				}
			} else {
				if (--_counter === 0) _done();
			}
		});
	} while (false);

})
 */
