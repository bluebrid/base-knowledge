const chalk = require('chalk');
const log = console.log;
class CustomLogerPlugin {
    apply(compiler) {
        let id = 0;
        const TYPES = {
            INIT: {
                COLOR: 'black',
                BACKGROUND: 'bgRed',
                PREFIX: '初始化Webpack'
            },
            HOOKS: {
                COLOR: 'redBright',
                BACKGROUND: 'bgBlack',
                PREFIX: '生命钩子'
            },
            DEFAULT: {
                COLOR: 'yellowBright',
                BACKGROUND: 'bgBlack'
            }
            
        }
        compiler.log = (options = {}) => {
            if (Object.prototype.toString.call(options) === '[object String]') {
                options = {
                    msg: options,
                }
            }
            let type = TYPES[(options.type || 'DEFAULT').toUpperCase()] || TYPES.DEFAULT;
            id++
            log(chalk[type.COLOR][type.BACKGROUND](type.PREFIX ? `[${type.PREFIX}]: ` : '')+ `${id}.` + options.msg)
        }
        compiler.hooks.beforeRun.tap("CustomLogerPlugin", compiler => {
            compiler.log({
                type: 'init',
                msg: '执行 beforeRun call CustomLogerPlugin'
            })
        });
    }
}

module.exports = CustomLogerPlugin