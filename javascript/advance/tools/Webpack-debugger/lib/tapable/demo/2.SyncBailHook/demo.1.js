/**
 * https://www.codercto.com/a/21587.html
 */
const { SyncBailHook } = require("../../lib");

const mySyncHook = new SyncBailHook(["name", "age"]);

mySyncHook.tap("name1", (name, age) => {
	console.log(name, age, "name1");
	return "wrong"; //关心返回值，如果返回值不为undefined 则后面的都不会执行，否则会继续执行
});

mySyncHook.tap("name2", (name, age) => {
	console.log(name, age, "name2");
});

mySyncHook.tap("name13", (name, age) => {
	console.log(name, age, "name3");
});

mySyncHook.call("Ivan Fan", "18");
// 调用call 执行的时候，最终根据上面tap 注册的事件(都保存在taps中)，生成如下的匿名函数:
// 从下面的代码可知，SyncBail 类型的钩子, 都是同步执行的，但是其关心返回值，
// 如果前面的注册的回调函数中，有返回值，且不为undefined, 则后面注册的都不会执行
/**
 * 
 (function anonymous(name, age
) {
	"use strict";
	var _context;
	var _x = this._x;
	var _fn0 = _x[0];
	var _result0 = _fn0(name, age);
	if (_result0 !== undefined) {
		return _result0;
		;
	} else {
		var _fn1 = _x[1];
		var _result1 = _fn1(name, age);
		if (_result1 !== undefined) {
			return _result1;
			;
		} else {
			var _fn2 = _x[2];
			var _result2 = _fn2(name, age);
			if (_result2 !== undefined) {
				return _result2;
				;
			} else {
			}
		}
	}

})
 */
