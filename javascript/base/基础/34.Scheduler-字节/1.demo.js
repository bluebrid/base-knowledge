// JavaScript 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。完善代码中 Scheduler类，使得以下程序能正确输出。
// https://juejin.cn/post/6970642160676765732

class Scheduler {
  constructor() {
    this.tasks = [] // 待运行的任务
    this.usingTask = [] // 正在运行的任务
  }
  // promiseCreator 是一个异步函数，return Promise
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve // 重定向到当前的resolve
      if (this.usingTask.length < 2) {
        this.usingRun(promiseCreator)
      } else {
        this.tasks.push(promiseCreator)
      }
    })
  }
  usingRun(promiseCreator) {
    this.usingTask.push(promiseCreator) // 运行中的队列入队
    promiseCreator().then(() => {
      // 调用then 表示执行完成， 应该出队
      promiseCreator.resolve() // 会执行 addTask的Then
      let index = this.usingTask.findIndex(promiseCreator)
      this.usingTask.splice(index, 1)
      if (this.tasks.length > 0) {
        this.usingRun(this.tasks.shift()) // 待执行的队列出队
      }
    })
  }
}
const timeout = (time) => new Promise(resolve => {
  // setTimeout(resolve, time) // callback 是resolve
  setTimeout(() => { resolve() }, time)
})
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(400, 4)
addTask(200, 2)
addTask(300, 3)
addTask(100, 1)
// 2, 4, 3, 1
