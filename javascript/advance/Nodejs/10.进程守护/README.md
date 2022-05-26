## [进程守护](https://cnodejs.org/topic/57adfadf476898b472247eac)
1. windows 杀死进程`tskill pid`
## 如何创建守护进程的启动方式
1. 创建一个A进程
2. 在进程A中创建进程B，我们可以使用fork,spawn 等方法
3. 对进程B执行`setsid`方法
4. 进程A退出，进程B由`init`进程接管，此时进程B为守护进程
```js
  var p = spawn('node', ['b.js'], {
  detached: true // spawn 的第三个参数中， 可以设置detached属性，
  // 如果设置未true, 则会调用setsid 方法， 这样就满足了我们对守护进程要求
});
``` 
## setsid 详解
1. 该进程变成一个新会话的会话领导
2. 该进程变成一个新进程的组长
3. 该进程没有控制终端
