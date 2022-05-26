/**
 * https://www.codercto.com/a/21587.html
 */
const { SyncLoopHook } = require("../../lib");

const mySyncHook = new SyncLoopHook(["name", "age"]);

let count = 0;
mySyncHook.tap("name1", (currectCount) => {
	console.log(count++);
	return count < currectCount || undefined;
});
mySyncHook.call(4);
/**
// 调用call 执行的时候，最终根据上面tap 注册的事件(都保存在taps中)，生成如下的匿名函数:
// 从下面的代码可知，SyncWaterfallHook  类型的钩子, 都是同步执行的，
//监听函数返回不是undefined表示继续循环，返回undefine表示结束循环
 (function anonymous(name, age
) {
	"use strict";
	var _context;
	var _x = this._x;
	var _loop;
	do {
		_loop = false;
		var _fn0 = _x[0];
		var _result0 = _fn0(name, age);
		if (_result0 !== undefined) {
			_loop = true;
		} else {
			if (!_loop) {
			}
		}
	} while (_loop);

})
 */
