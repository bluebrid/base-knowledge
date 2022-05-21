/**
 * 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
 * 异步队列都可以这样操作
 */
class Scheduler {
  constructor() {
    this.isPedding = false;
    this.enqueue = [];
    setTimeout(async () => {
      // 宏任务，添加异步队列里面去
      await this.run()
    })
  }
  add(task, timeSpan = 1000) {
    this.enqueue.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          task();
          resolve(true)
        }, timeSpan)
      })

    })
    return this
  }
  async run() {
    while (this.enqueue.length) {
      const header = this.enqueue.shift() // 先进先出
      await header();
      this.enqueue.push(header)
    }
  }
}
Scheduler.getInstance = function () {
  if (!Scheduler.instance) {
    Scheduler.instance = new Scheduler()
  }
  return Scheduler.instance
}
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
const instance = Scheduler.getInstance();
instance.add(red, 3000).add(green, 1000).add(yellow, 2000)
