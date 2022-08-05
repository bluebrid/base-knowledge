
class Chain {
  constructor() {
    this.queue = []
    setTimeout(() => {
      this._run()
    })
  }
  eat() {
    const cb = () => {
      console.log('I am eating. ')
      this._run()
    }
    this.queue.push(cb)
    return this;
  }
  sleep(timeSpan) {
    const cb = () => {
      console.log('I am sleeping.')
      setTimeout(() => {
        this._run()
      }, 1000 * timeSpan)
    }
    this.queue.push(cb)
    return this;
  }
  work() {
    const cb = () => {
      console.log('I start working.')
      this._run()
    }
    this.queue.push(cb)
    return this;
  }
  _run() {
    if (this.queue.length) {
      const task = this.queue.shift()
      task()
    } else {
      console.log('Done!')
    }
  }
}
new Chain().eat().sleep(5).eat().sleep(6).work()