class LazyMan {
    constructor(name) {
        this.name = name
        this.queue = []
        setTimeout(() => {
            this.runNext()
        })
    }
    runNext() {
        const top = this.queue.shift()
        if (top) {
            top()
        }
    }
    sleep(timeSpan) {
        const func = () => {
            console.log('sleep:', timeSpan)
            setTimeout(() => {
                this.runNext()
            }, timeSpan)
        }
        this.queue.push(func)
        return this;
    }
    eat(food) {
        const func = () => {
            console.log(`${this.name} start to eat ${food}`)
            this.runNext()
        }
        this.queue.push(func)
        return this;
    }
}

new LazyMan('ivan').sleep(1000 * 3).eat('app').sleep(2000).eat('race').eat('ba')