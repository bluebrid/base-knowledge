/**
 * https://www.codercto.com/a/21587.html
 */
const { SyncWaterfallHook } = require("../../lib");

const mySyncHook = new SyncWaterfallHook(["name", "age"]);

mySyncHook.tap("name1", (name, age) => {
	console.log(name, age, "name1");
	return ["wrong", '22']; // 不关心返回值 这里写返回值对结果没有任何影响
});

mySyncHook.tap("name2", (name, age) => {
	console.log(name, age, "name2");
});

mySyncHook.tap("name13", (name, age) => {
	console.log(name, age, "name3");
});

mySyncHook.call("Ivan Fan", "18");
/**
// 调用call 执行的时候，最终根据上面tap 注册的事件(都保存在taps中)，生成如下的匿名函数:
// 从下面的代码可知，SyncWaterfallHook  类型的钩子, 都是同步执行的，
//下一个任务要拿到上一个任务的返回值, 但是只能传递一个参数
 (function anonymous(name, age
) {
	"use strict";
	var _context;
	var _x = this._x;
	var _fn0 = _x[0];
	var _result0 = _fn0(name, age);
	if (_result0 !== undefined) {
		name = _result0;
	}
	var _fn1 = _x[1];
	var _result1 = _fn1(name, age);
	if (_result1 !== undefined) {
		name = _result1;
	}
	var _fn2 = _x[2];
	var _result2 = _fn2(name, age);
	if (_result2 !== undefined) {
		name = _result2;
	}
	return name;

})
 */
