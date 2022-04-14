const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'
class EventEmeitter {
    constructor() {
        this.listeners = {};
    }
    on(type, listener) {
        this.listeners[type] ? this.listeners[type].push(listener) :  this.listeners[type] = [listener];
    }
    emit(type, msg) {
        if (this.listeners[type]) {
            this.listeners[type].forEach(listener => {
                if (isFunction(listener)) {
                    listener(msg);
                }
            });
        }
    }
    off(type, listener) {
        let tempListener = [];
        if(this.listeners[type]) {
            let index = this.listeners[type].indexOf(lis => lis === listener);
            this.listeners[type].splice(index, 1);        
        }
    }
}
const proxy = (function(){
    let _instance = undefined;
    return () => {
        if (!_instance) {
            _instance =  new EventEmeitter();
        }
        return _instance;
    }
})()
const emitter = proxy();
const emitter2 = proxy();

emitter.on('A', msg => {
    console.log('[A1]:', msg)
})
emitter.on('A', msg => {
    console.log('[A2]:', msg)
})
emitter.on('B', msg => {
    console.log('[B1]:', msg)
})
emitter.on('B', msg => {
    console.log('[B2]:', msg)
})
emitter.on('B', msg => {
    console.log('[B3]:', msg)
})
emitter.emit('A', 'Hello world A')
emitter.emit('B', 'Hello world B')
emitter.on('B', msg => {
    console.log('[B4]:', msg)
})
const listenerB5 = msg => {
    console.log('[B5]:', msg)
}
emitter2.on('B', listenerB5)
emitter.emit('B', 'Hello world B 01')
emitter2.off('B', listenerB5)
emitter2.emit('B', 'Hello world B 02')