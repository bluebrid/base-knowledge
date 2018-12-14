/**
 * history.js
 */
const EVENT_TYPE = {
    POPSTATUS: 'popstatus',
    HASHCHANGE: 'hashchange'
}
const globalHistory = window.history;
class history {
    constructor() {
        this.listeners = [];
    }
    registerEvents() {
        window.addEventListener(EVENT_TYPE.POPSTATUS, (e) => {
            console.log(e.state)
        })
        window.addEventListener(EVENT_TYPE.HASHCHANGE, (e) => {

        })
    }
    replace(to) {

    }
    push(to) {  
        window.location.href = href;
        this.listeners.forEach(fn=> {
            if (Object.prototype.toString.call(fn) === '[Object Function]') {
                fn();
            }
        });
    }
    listener(fn) {
        this.listeners.push()
    }
    setState() {

    }
}

let createHistory = (() => {
    let instance
    return () => {
        if (instance instanceof history) {
            return instance
        } else {
            instance = new history();
            instance.registerEvents();
            return instance;
        }
    }

})()()
