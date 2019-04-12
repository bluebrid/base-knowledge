const Compiler = require('./Compiler')

class MyPlugin{
    constructor() {

    }
    /**
     * 1. apply 是在初始化compiler 的时候执行的
     * 2. 在apply 中去执行compiler 的hooks .
     * @param {*} conpiler 
     */
    apply(compiler){//接受 compiler参数
        /**
         * tap 的第一个参数是一个Object , 如果传入的是一个字符串，则会转换成：
         * {
         *   name: options
         * }
         * 如果传入的是一个Object， 可以传入：
         * {
         *  name: name,
         *   before: [] or 'before'// before 可以是一个字符串，也可以是一个数组
         * }
         * 第二参数是hooks 的执行方法
         * tap 其实相当于绑定事件.
         * 对应的call 相当于执行事件， 在compiler 中调用call 方法
         */
        compiler.hooks.break.tap("WarningLampPlugin", () => 
          console.log('WarningLampPlugin')
        );
        compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => 
          console.log(`Accelerating to ${newSpeed}`)
        );
        compiler.hooks.calculateRoutes.tapAsync("calculateRoutes tapAsync", (source, target, routesList, callback) => {
            setTimeout(() => {
                console.log(`tapAsync to ${source}${target}${routesList}`)
                callback();
            }, 2000)
        });
    }
}


//这里类似于webpack.config.js的plugins配置
//向 plugins 属性传入 new 实例

const myPlugin = new MyPlugin();

const options = {
    plugins: [myPlugin]
}
let compiler = new Compiler(options)
compiler.run()
