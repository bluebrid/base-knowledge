// https://jsfiddle.net/IvanFan/hen52f08/5/
class Logger {
    // 需要配置babel 插件@babel/plugin-proposal-class-properties， 才能在class中添加属性
    template = '<div class="alert alert-${type} alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> ${msg}</div>';

    constructor(elm) {
        this.elm = $(elm);
    }

    $$template(level, msg) {
        return this.template.replace('${type}', level).replace('${msg}', `${level}: ${msg}`);
    }
    info(msg) {
        this.elm.append(this.$$template('info', msg));
    }

    debug(msg) {
        this.elm.append(this.$$template('success', msg));
    }
    warn(msg) {
        this.elm.append(this.$$template('warning', msg));
    }
    error(msg) {
        this.elm.append(this.$$template('danger', msg));
    }
}

let log = (type) => {
    const logger = new Logger('#console');
    return (target, name, descriptor) => {
        const method = descriptor.value;
        descriptor.value = (...args) => {
            logger.info(`(${type}) before function execute: ${name}(${args}) = ?`);
            let ret;
            try {
                ret = method.apply(target, args);
                logger.info(`(${type})after function execute success: ${name}(${args}) => ${ret}`);
            } catch (error) {
                logger.error(`(${type}) function execute error: ${name}(${args}) => ${error}`);
            } finally {
                logger.info(`(${type}) function execute done: ${name}(${args}) => ${ret}`);
            }
            return ret;
        }
    }
}

class MyClass {
    @log('MyClass add')
    add(a, b) {
        return a + b;
    }
    @log('MyClass product')
    product(a, b) {
        return a * b;
    }
    @log('MyClass error')
    error() {
        throw 'Something is wrong!';
    }
}

let my = new MyClass();
my.add(2, 3);
my.product(2, 3);
my.error(2, 3);

export default MyClass