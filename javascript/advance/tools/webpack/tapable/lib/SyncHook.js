/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory = new SyncHookCodeFactory();

class SyncHook extends Hook {
	tapAsync() {
		throw new Error("tapAsync is not supported on a SyncHook");
	}

	tapPromise() {
		throw new Error("tapPromise is not supported on a SyncHook");
	}
	/**
	 * 实现子类的compile 方法
	 * @param {*} options 
	 */
	compile(options) {
		/**
		 * setup(instance, options) {
			instance._x = options.taps.map(t => t.fn);
		   }
		   Compiler.js(run) => Compiler.js(this.hooks.accelerate.call(param)) => Hook.js(call function: lazyCompileHook()) => _createCall => compile
		   => 
		 */
		factory.setup(this, options);
		/**
		 * 	 fn = new Function(
					this.args(),
					'"use strict";\n' +
						this.header() +
						this.content({
							onError: err => `throw ${err};\n`,
							onResult: result => `return ${result};\n`,
							onDone: () => "",
							rethrowIfPossible: true
						})
				);
				break;
		
		 */
		// factory.create 返回的是一个fn
		return factory.create(options);
	}
}

module.exports = SyncHook;
