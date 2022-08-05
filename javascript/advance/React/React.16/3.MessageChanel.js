const channel = new MessageChannel()
const port = channel.port2
const scheduler = {
  scheduleTask() {
    // 挑选一个任务并执行
    const task = pickTask()
    const continuousTask = task()
 
    // 如果当前任务未完成，则在下个宏任务继续执行
    if (continuousTask) {
      port.postMessage(null)
    }
  },
}

// 每次 port.postMessage() 调用就会添加一个宏任务
// 该宏任务为调用 scheduler.scheduleTask 方法
channel.port1.onmessage = scheduler.scheduleTask