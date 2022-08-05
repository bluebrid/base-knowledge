https://github.com/nodejs/node/blob/d247a8e1dc/lib/http.js

https://github.com/chyingp/nodejs-learning-guide

https://www.npmtrends.com/ajv-vs-joi-vs-validator

[Nodejs探秘：深入理解单线程实现高并发原理](https://blog.csdn.net/j2IaYU7Y/article/details/81623516?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2)

[《吊打面试官》系列 Node.js 必知必会必问！！](https://mp.weixin.qq.com/s/94wxm57cd3fS96gixVAxMA)

## node 架构
![](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_jpg/tvEoHIulOU6O97KhZyY16AXcrlX8qrCibXv3bk317tXKlSYUBNQicD9obpP1DjT627ed6QebGsW5ia3ICX4MzWkaw/640?wx_fmt=jpeg)
1. 顶层就是Nodejs standard library 
> Nodejs 标准库，这部分就是JavaScript编写的，即我们使用过程中调用的API
2. Node bindings
> Node bindings 这一层是Javascript 与底层c/C++能够沟通的关键，nodejs 通过bindings 调用c/C++相互进行数据的交互， 实现在node.cc
3. V8(js VM ), libuv(线程池thread pool, 事件循环event loop , 异步I/O async I/O), C-ares(async DNS), http_parser OpenSSL, zlib, etc
> **V8:** Google推出的javascript VM, 也是Node能运行javascript 的关键， 它为javascript 提供了在非浏览器运行的环境， 他的高效是nodeJS高效的原因
> **Libuv:** 它为nodejs 提供跨平台，线程池，事件队列，异步i/o ,是Nodejs强大的关键
> **C-ares:** 提供了异步处理DNS的相关的能力
> **http_parser、OpenSSL、zlib 等**：提供包括 http 解析、SSL、数据压缩等其他的能力。


## 总结
1. Nodejs 和操作系统的交互，我们在javascript中调用的方法， 最终都会通过process.binding 传递到C/C++层面，最终由他们来真正的操作， 这就是Nodejs 和操作系统的交互方式
> 我们利用fs模块来操作文件系统，其实主要流程是如下：
> 1. 调用Nodejs的fs 模块, fs.open
> 2. nodejs 通过process.binding 调用c/C++层面的open函数
> 3. 在c/C++的open中判断不同的平台，然后调用不同平台的底层文件接口，进行文件的操作

2. Nodejs 所谓的单线程模式，主要是主线程是单线程， 所有的网络请求或者异步操作都交给了内部的线程池来处理， 主线程本身只负责不断的往返调度，事件循环不断驱动事件执行
2. Nodejs 之所以可以处理高并发，得益于livub层的事件循环机制和底层的线程池的实现
3. Event loop(事件循环)就是主线程从主线程的事件队列中不停的循环的读取事件，驱动所有的异步回调函数的执行， Event loop 有七个阶段，每个阶段都有一个任务队列，当所有的阶段都执行一遍后，Event loop 相当于完成了一个tick.

## Nodejs 优缺点
> 优点： 高并发，io密集型处理
> 缺点： 不适合CPU计算密集型，对关系型数据库支持不友好， 对代码的健壮性要求高

## Nodejs 适合高并发的原理
> Nodejs 是基于**事件驱动**，**异步非阻塞**， 通过事件驱动的IO来操作完成平台数据密集型实时应用
> 传统的server 都是每个请求都会创建一个**线程**， 在线程的创建和销毁的花销非常大，Nodejs 是一个单线程，是是使用Libuv 来保持数据的高并发(**线程池**， **事件队列**， **异步IO**)

## Node JS 技术选型的参考
1. Nodejs 是基于事件驱动， 异步非阻塞的，所以适用于高并发
2. Nodejs 是单线程，避免了线程创建和销毁之间上下文切换的产生的开销
3. Nodejs 要尽量避免**耗时**操作， 因为是单线程，会阻塞后面的响应没法处理
4. 当我们的项目中存在大量计算的时候，CPU耗时操作的时候，我们需要考虑开启多进程来完成
5. NodeJS 开发过程中， 错误会引起整个应用的退出， 应用的健壮性值得考虑，尤其是错误的抛出， 以及进程守护是必须需要做的
<<<<<<< HEAD
6. 单线程是无法利用多核CPU的， 但是像Cluster， child_process，worker_threads 可以解决这个问题
=======
6. 单线程是无法利用多核CPU的， 但是像Cluster， child_process，worker_threads 可以解决整个问题
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
[请问web开发为什么选择nodejs？](http://www.imooc.com/wenda/detail/571232)


## NodeJS 自定义插件
[node-addon-examples](https://github.com/nodejs/node-addon-examples)

## Nodejs 内存泄漏
[如何分析 Node.js 中的内存泄漏](https://zhuanlan.zhihu.com/p/25736931)
[快速定位线上 Node.js 内存泄漏问题](https://zhuanlan.zhihu.com/p/36349283)