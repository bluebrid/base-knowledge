
[深入理解进程与线程](https://github.com/koala-coding/goodBlog/blob/master/docs/node/processAndThread.md)

1. NodeJS 是单线程(所谓的单线程，就是一个进程只能启动一个进程)
2. 对应单线程，需要避免有过多耗时操作，因为会阻塞，后面的响应无法处理
3. 虽然NodeJS是一个单线程，但是其实基于**事件驱动****异步非阻塞模式**, 可以用于高并发场景，避免了线程创建和现场之间上下文切换的产生的开销
4. 当我们的项目中存在大量计算的时候，CPU耗时操作的时候，我们需要考虑开启多进程来完成
5. NodeJS 开发过程中， 错误会引起整个应用的退出， 应用的健壮性值得考虑，尤其是错误的抛出， 以及进程守护是必须需要做的
6. 单线程是无法利用多核CPU的， 但是想Cluster， child_process 可以解决整个问题


1. cluster模块是一个主进程管理一组工作进程
2. cluster 模块调用的fork 方法来创建子进程，该方法与child_process中的fork 其实是同一方法
3. 
