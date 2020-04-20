[深入了解 JavaScript 内存泄露](https://juejin.im/post/5d68baf6e51d4561e224a384)
[探索学习NodeJs内存管理](https://www.jianshu.com/p/4679f3e5e340)
[Node.js-Troubleshooting-Guide](https://github.com/aliyun-node/Node.js-Troubleshooting-Guide)

1. 分配内存
2. 使用内存
3. 回收内存

内存泄漏： 就是内存不再需要了， 但是没有经过生命周期去**释放内存**, 那么就存在内存泄漏

内存回收的两种方式：
1. 引用计数垃圾收集
> 也就是判断对象是否还有其他的对象引用到他，如果没有引用指向这个对象， 那么这个对象就会被垃圾回收
2. 标记清除法
> 当变量进入执行环境，这个变量会被标记为`进入环境`， 当变量离开执行环境时，这个变量会被标记为`离开环境`,被标记为`进入环境`的变量是不能被回收的，因为他们正在使用， 而被标记为`离开环境`的变量则可以被回收

内存泄漏的场景：
1. 意外的全局变量，如在一个函数中，定义一个变量但是没用使用`var let`
2. 在销毁组件的时候，没有清除定时器
3. 在销毁组件的时候，没有删除事件监听
4. 被遗忘的订阅发布事件监听器
5. 被遗忘的闭包
6. 脱离DOM的引用
7. 被遗忘的ES6 Set成员
8. 被遗忘的ES6 Map 的key 

定位内存泄漏的位置：
1. 通过Chrome 的Perference 来进行录制定位
2. Nodejs 可以安装插件easy-monitor 来进行分析定位
3. 打印出堆快照(npm i heap)，然后倒入到chrome, 进行分析， 到底哪里可能存在内存泄漏

## Node 常驻内存模型
[V8 内存浅析](https://zhuanlan.zhihu.com/p/33816534)
1. 分为两种内存： 堆内内存和堆外内存
2. 堆内内存是V8负责管理， 堆外内存是C++程勋管理
3. 堆内内存分为： new space, code space, map space, old space, large object space
4. 可以通过process.memoryUsage() 来查看常驻内存： 
```json
{ 
    rss: 21475328,//分配给该进程的物理内存
    heapTotal: 7159808,// 为V8 管理的内存当前可以分配的大小
    heapUsed: 4358568,// 堆内内存已经使用的大小
    external: 8224 // 堆外内存使用的大小
}
```