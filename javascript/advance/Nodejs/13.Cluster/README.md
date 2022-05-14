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