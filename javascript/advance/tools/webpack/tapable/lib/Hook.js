/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const util = require("util");

const deprecateContext = util.deprecate(() => {},
"Hook.context is deprecated and will be removed");
/**
 * 1. Hook 是所有的Hooks 的基类，定义了所有的方法
 * 2. 
 */
class Hook {
	constructor(args = []) {
		// args 是一个数组， 如： const hook1 = new SyncHook(["arg1", "arg2", "arg3"]);
		this._args = args;
		this.taps = [];
		this.interceptors = [];
		this.call = this._call;
		this.promise = this._promise;
		this.callAsync = this._callAsync;
		this._x = undefined;
	}
	/**
	 * 抽象方法，必须由子类实现， compile 是一个核心的方法
	 * @param {*} options 
	 */
	compile(options) {
		throw new Error("Abstract: should be overriden");
	}

	_createCall(type) {
		// 这里其实指向的就是子类的compile 方法
		return this.compile({
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		});
	}

	_tap(type, options, fn) {
		if (typeof options === "string") {
			options = {
				name: options
			};
		} else if (typeof options !== "object" || options === null) {
			throw new Error("Invalid tap options");
		}
		if (typeof options.name !== "string" || options.name === "") {
			throw new Error("Missing name for tap");
		}
		if (typeof options.context !== "undefined") {
			deprecateContext();
		}
		options = Object.assign({ type, fn }, options);
		options = this._runRegisterInterceptors(options);
		this._insert(options);
	}
	/**
	 * 提供了三种类型的tab： sync, async, promise
	 * @param {*} options 
	 * @param {*} fn 
	 */
	tap(options, fn) {
		this._tap("sync", options, fn);
	}

	tapAsync(options, fn) {
		this._tap("async", options, fn);
	}

	tapPromise(options, fn) {
		this._tap("promise", options, fn);
	}

	_runRegisterInterceptors(options) {
		for (const interceptor of this.interceptors) {
			if (interceptor.register) {
				const newOptions = interceptor.register(options);
				if (newOptions !== undefined) {
					options = newOptions;
				}
			}
		}
		return options;
	}

	withOptions(options) {
		const mergeOptions = opt =>
			Object.assign({}, options, typeof opt === "string" ? { name: opt } : opt);

		// Prevent creating endless prototype chains
		options = Object.assign({}, options, this._withOptions);
		const base = this._withOptionsBase || this;
		const newHook = Object.create(base);

		newHook.tap = (opt, fn) => base.tap(mergeOptions(opt), fn);
		newHook.tapAsync = (opt, fn) => base.tapAsync(mergeOptions(opt), fn);
		newHook.tapPromise = (opt, fn) => base.tapPromise(mergeOptions(opt), fn);
		newHook._withOptions = options;
		newHook._withOptionsBase = base;
		return newHook;
	}

	isUsed() {
		return this.taps.length > 0 || this.interceptors.length > 0;
	}
	/**
	 * 拦截器怎么使用呢？
	 * 配置的拦截器需要有register方法
	 * 	const newOptions = interceptor.register(options); 拦截器，就是调用register 方法，对插件的执行hooks 的参数进行拦截加工，返回一个新的参数对象
	 * @param {*} interceptor 
	 */
	intercept(interceptor) {
		this._resetCompilation();
		this.interceptors.push(Object.assign({}, interceptor));
		if (interceptor.register) {
			for (let i = 0; i < this.taps.length; i++) {
				this.taps[i] = interceptor.register(this.taps[i]);
			}
		}
	}
	/**
	 * 将_call, _callAsync, _promise 重命名挂载在Hooks的prototype上
	 */
	_resetCompilation() {
		this.call = this._call;
		this.callAsync = this._callAsync;
		this.promise = this._promise;
	}
	/**
	 * 将插件保存在Hooks 的taps 的数组中
	 * @param {item 其实就是一个Plugin 的配置对象} item 
	 */
	_insert(item) {
		this._resetCompilation();
		let before;
		if (typeof item.before === "string") {
			before = new Set([item.before]);
		} else if (Array.isArray(item.before)) {
			before = new Set(item.before);
		}
		let stage = 0;
		if (typeof item.stage === "number") {
			stage = item.stage;
		}
		let i = this.taps.length;
		while (i > 0) {
			i--;
			const x = this.taps[i];
			this.taps[i + 1] = x;
			const xStage = x.stage || 0;
			if (before) {
				if (before.has(x.name)) {
					before.delete(x.name);
					continue;
				}
				if (before.size > 0) {
					continue;
				}
			}
			if (xStage > stage) {
				continue;
			}
			i++;
			break;
		}
		// 将插件保存在Hooks 的taps 属性数组中
		this.taps[i] = item;
	}
}

function createCompileDelegate(name, type) {
	return function lazyCompileHook(...args) {
		// 在这里会执行_createCall方法， 这个方法就是调用Hooks 的compile方法。
		/**
		 * 	_createCall(type) {
		// 这里其实指向的就是子类的compile 方法
				return this.compile({
					taps: this.taps,
					interceptors: this.interceptors,
					args: this._args,
					type: type
				});
			}
		 */
		/**
		 * 	 
			compile(options) {
				factory.setup(this, options);
				return factory.create(options);
			}
		 */
		this[name] = this._createCall(type);	
		
		/**
		 * this._createCall 
		 * (function anonymous(
			) {
			"use strict";
			var _context;
			var _x = this._x;
			var _fn0 = _x[0];
			_fn0();

			})
			(function anonymous(newSpeed
			) {
			"use strict";
			var _context;
			var _x = this._x;
			var _fn0 = _x[0];
			_fn0(newSpeed);

			})
		 *  */
		// 这个_fn0 就是执行tap 传递进来的第二个参数fn, 
		/**
		 *    compiler.hooks.break.tap("WarningLampPlugin", () => 
				console.log('WarningLampPlugin')
			);
		 */
		return this[name](...args);
	};
}
/**
 * 在Hook.prototype 上面挂载了_call, _callAsync, _promise 三个属性
 */
Object.defineProperties(Hook.prototype, {
	_call: {
		value: createCompileDelegate("call", "sync"),
		configurable: true,
		writable: true
	},
	_callAsync: {
		value: createCompileDelegate("callAsync", "async"),
		configurable: true,
		writable: true
	},
	_promise: {
		value: createCompileDelegate("promise", "promise"),
		configurable: true,
		writable: true
	}
});

module.exports = Hook;
