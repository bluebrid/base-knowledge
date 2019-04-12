const {
    SyncHook,
    AsyncParallelHook
} = require('../lib');

class Compiler {
    constructor(options) {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]), // newSpeed 表示要在调用call 需要传递的参数
            break: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
        let plugins = options.plugins;
        if (plugins && plugins.length > 0) {
            /**
             * 在初始化Compiler 的时候，会去遍历执行plugin, 执行apply 方法
             */
            plugins.forEach(plugin => plugin.apply(this));
        }
    }
    run(){
        console.time('cost');
        this.accelerate('10000000')
        this.break()
        this.calculateRoutes('i', 'like', 'tapable')
    }
    accelerate(param){
        // 这里的call , callAsync, call 是在Hook.js _resetCompilation 定义的
        this.hooks.accelerate.call(param);
    }
    break(){
        this.hooks.break.call();
    }
    calculateRoutes(){
        const args = Array.from(arguments)
        this.hooks.calculateRoutes.callAsync(...args, err => {
            console.timeEnd('cost');
            if (err) console.log(err)
        });
    }
}

module.exports = Compiler
