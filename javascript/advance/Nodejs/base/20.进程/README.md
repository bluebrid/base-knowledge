
[深入理解进程与线程](https://github.com/koala-coding/goodBlog/blob/master/docs/node/processAndThread.md)
[进程和线程的面试题](https://juejin.cn/post/6844903870066327566)
1. NodeJS 是单线程(所谓的单线程，就是一个进程只能启动一个线程)
2. 对单线程，需要避免有过多耗时操作，因为会阻塞，后面的响应无法处理
3. 虽然NodeJS是一个单线程，但是其实基于**事件驱动****异步非阻塞模式**, 可以用于高并发场景，避免了线程创建和现场之间上下文切换的产生的开销
4. 当我们的项目中存在大量计算的时候，CPU耗时操作的时候，我们需要考虑开启多进程来完成
5. NodeJS 开发过程中， 错误会引起整个应用的退出， 应用的健壮性值得考虑，尤其是错误的抛出， 以及进程守护是必须需要做的
6. 单线程是无法利用多核CPU的， 但是像Cluster， child_process，worker_threads 可以解决整个问题


1. cluster模块是一个主进程管理一组工作进程
2. cluster 模块调用的fork 方法来创建子进程，该方法与child_process中的fork 其实是同一方法

## 进程之间的通行
1. IPC(Inter-process communication)，即进程间通信技术，由于每个进程创建之后，都有自己的独立地址空间，实现IPC的目的就是为了进程之间资源共享访问
2. IPC的方式有： <font color=red>管道(pipe)，消息队列，信号量，Domain Socket</font>,Node 通过pipe 来通信
3. 
