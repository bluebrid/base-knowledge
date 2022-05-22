## [Nodejs 进阶：解答 Cluster 模块的几个疑问](https://www.imooc.com/article/301846)
```js
// app.js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log(`Master 进程 ${process.pid} 正在运行`);
	
  for (let i = 0; i < numCPUs; i++) { // 衍生工作进程。
    cluster.fork();
	}
	
  cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} 已退出`) });
} else {
  http.createServer((req, res) => res.end(`你好世界 ${process.pid}`)).listen(8000);
  console.log(`Worker 进程 ${process.pid} 已启动`);
}
```
## 集群模式
1. 方案1： 1个Node实例开启多个端口，通过反向代理服务器向各个端口服务进行转发
> 1. 缺点：占用多个端口，造成资源浪费
> 2. 缺点：多个实例是独立运行的，进程之间的通信不好做
> 3. 优点： 稳定性高，各个实例之间无影响
2. 方案2： 1个Node实例开启多个进程监听同一个端口，通过负载均衡技术分配请求(master-> worker)
> 1. 好处：进程之间的通信相对简单
> 2. 好处：减少了端口资源的浪费
> 3. 缺点：需要保证进程的稳定性

## 多个进程为什么可以监听同一个端口？
1. Master 进程创建了一个Socket并绑定监听该目标端口
2. 通过与子进程之间建立`IPC`通道后， 通过调用子进程的`send`方法，将`Socket`（连接句柄）传递过去

## [分享 10 道 Nodejs 进程相关面试题](https://mp.weixin.qq.com/s/dKN95zcRI7qkwGYKhPXrcg)
1. [进程和线程的区别](https://mp.weixin.qq.com/s?__biz=MzIyNDU2NTc5Mw==&mid=2247483699&idx=1&sn=a64b349baa8662c27ac211de130eb28b&chksm=e80c4e7ddf7bc76b7869f74605588a6bd3f6a960d9cb19b1a9c4e3518156092c9fc25bf74d54&scene=21#wechat_redirect)
> 1. <font color=red>进程：</font>是系统进行资源分配和调度的<font color=red>基本单位</font>
> 2. <font color=red>进程是线程的容器</font>,一个进程可能会包含多个线程
> 3. 我们启动一个服务，运行一个实例，就是开一个服务进程，比如说启动Nodejs 服务，就是开启了一个服务进程
> 4. NodeJS 开启多进程，是通过fork 进行开启的
> 5. 进程之间的通信由：<font color=red>pipe(管道，nodejs使用pipe),信号量，消息中间件</font>
1. 什么是孤儿进程？
   > 1. 父进程创建子进程后， 父进程退出了， 但是对应的父进程，创建的子进程，还在运行， 这里的子进程，就会被系统的<font color=red>init</font>进程收养，这就是孤儿进程
2. 创建多进程， 代码里有`app.listen(port)`进行fork,为什么没有包端口被占用？
   > 1. 只有Master进程创建了一个Socket并绑定了该目标端口
   > 2. 父子进程通过<font color=red>IPC</font>通道进行通信， 通过调用子进程的<font color=red>Send</font>方法，将<font color=red>Socket(连接句柄)</font>传递给子进程
3. 什么是IPC，如何创建IPC通信，什么场景会用到IPC？
   > 1. IPC（Inter-process communication）:即进程之间的通信，每个创建的进程都有自己的对立的地址空间，实现IPC是为了实现<font color=red>进程之间的资源共享访问</font>
   > 2. 实现IPC的方法有：<font color=red>管道(pipe),信号量， 消息队列，DomainSocket,</font>
4. 什么是进程守护？怎么编写？
   > 1. 守护进程不受<font color=red>终端影响</font>，也就是终端关闭，守护的进程还在运行
   > 2. 创建子进程
   > 2. 在子进程中创建新的会话(系统函数会调用<font color=red>setsid</font>)
   > 3. 改变子进程工作目录
   > 4. 终止父进程