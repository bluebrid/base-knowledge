const http = require('http');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
if (cluster.isMaster) { 
    // 主进程通过fork 来创建子进程，其实整个fork 跟child_process.fork是同一个方法
    // 2. 主进程不负责具体的事情，值负责调度和管理
    // 3. cluster 利用内置的负载均衡模块来处理进程之间的压力
    
    console.log('Master proces id is', process.pid);
    // fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker process died,id', worker.process.pid)
    })
} else {
    // Worker可以共享同一个TCP连接
    // 这里是一个http服务器
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('hello word');
    }).listen(8000);
    // 如果多个Node进程监听同一个端口，会报错，为什么cluster 模块不会呢？
    // 原因是： 在master进程中，启动了一个TCP服务器， 而真正监听端口的只有这个服务器，
    // 当来自前端的请求被这个TCP服务器的connection事件监听后， master会将对应的socket 句柄发送给子进程
}