const { AsyncParallelBailHook }  = require("../../lib");
const myAsyncParallelBailHook = new AsyncParallelBailHook(['name']);

// 第一种注册方式 tap
myAsyncParallelBailHook.tap('1', function (name) {
    console.log(1, name)
    return 'wrong'
})

myAsyncParallelBailHook.tap('2', function (name) {
    console.log(2, name)
})

myAsyncParallelBailHook.tap('3', function (name) {
    console.log(3, name)
})

myAsyncParallelBailHook.callAsync('liu', function () {
    console.log('over')
});

/**
 * 1.只要有一个报错了， 或者返回了一个非undefined 的结果， 则后面的都不会执行了.
 * 2.
 (function anonymous(name, _callback
) {
	"use strict";
	var _context;
	var _x = this._x;
	var _results = new Array(3);
	var _checkDone = () => {
		for (var i = 0; i < _results.length; i++) {
			var item = _results[i];
			if (item === undefined) return false;
			if (item.result !== undefined) {
				_callback(null, item.result);
				return true;
			}
			if (item.error) {
				_callback(item.error);
				return true;
			}
		}
		return false;
	}
	do {
		var _counter = 3;
		var _done = () => {
			_callback();
		};
		if (_counter <= 0) break;
		var _fn0 = _x[0];
		var _hasError0 = false;
		try {
			var _result0 = _fn0(name);
		} catch (_err) {
			_hasError0 = true;
			if (_counter > 0) {
                // 报错了，会将error放在_results保存
				if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err }), _checkDone())) {
					_counter = 0;
				} else {
					if (--_counter === 0) _done();
				}
			}
		}
		if (!_hasError0) {
			if (_counter > 0) {
                // 没有报错，则会将result 放在_results 中保存
				if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
					_counter = 0;
				} else {
					if (--_counter === 0) _done();
				}
			}
		}
		if (_counter <= 0) break;
		if (1 >= _results.length) {
			if (--_counter === 0) _done();
		} else {
			var _fn1 = _x[1];
			var _hasError1 = false;
			try {
				var _result1 = _fn1(name);
			} catch (_err) {
				_hasError1 = true;
				if (_counter > 0) {
					if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err }), _checkDone())) {
						_counter = 0;
					} else {
						if (--_counter === 0) _done();
					}
				}
			}
			if (!_hasError1) {
				if (_counter > 0) {
					if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
						_counter = 0;
					} else {
						if (--_counter === 0) _done();
					}
				}
			}
		}
		if (_counter <= 0) break;
		if (2 >= _results.length) {
			if (--_counter === 0) _done();
		} else {
			var _fn2 = _x[2];
			var _hasError2 = false;
			try {
				var _result2 = _fn2(name);
			} catch (_err) {
				_hasError2 = true;
				if (_counter > 0) {
					if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err }), _checkDone())) {
						_counter = 0;
					} else {
						if (--_counter === 0) _done();
					}
				}
			}
			if (!_hasError2) {
				if (_counter > 0) {
					if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
						_counter = 0;
					} else {
						if (--_counter === 0) _done();
					}
				}
			}
		}
	} while (false);

})
 */