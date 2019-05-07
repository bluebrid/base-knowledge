/**
 * https://www.codercto.com/a/21587.html
 */
const { SyncHook } = require("../../lib");

const mySyncHook = new SyncHook(["name", "age"]);

mySyncHook.tap("name1", (name, age) => {
	console.log(name, age, "name1");
	return "wrong"; // 不关心返回值 这里写返回值对结果没有任何影响
});

mySyncHook.tap("name2", (name, age) => {
	console.log(name, age, "name2");
});

mySyncHook.tap("name13", (name, age) => {
	console.log(name, age, "name3");
});

mySyncHook.call("Ivan Fan", "18");
// 调用call 执行的时候，最终根据上面tap 注册的事件(都保存在taps中)，生成如下的匿名函数:
// 从下面的代码可知，sync 类型的钩子, 都是同步执行的，而且不关系返回值
/**
 * (function anonymous(name, age
) {
"use strict";
var _context;
var _x = this._x;
var _fn0 = _x[0];
_fn0(name, age);
var _fn1 = _x[1];
_fn1(name, age);
var _fn2 = _x[2];
_fn2(name, age);

})
 */
