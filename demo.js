/*
1.浏览器的渲染原理。
2.js 垃圾回收原理
3.选型
4. diff
5, redux 原理
6， crsf
8,性能优化
9,ssrf
10， 算法
11， CDN
12, Koa 源码的异常处理
13， 为什么是三次握手，四次挥手
14，Node怎么部署，重启，监听PM2
15， Linux 怎么杀死某个进程
16，*/

const http = require('http');

const server = http.createServer();
server.listen(3000,()=>{
    process.title='程序员成长指北测试进程';
    console.log('进程id',process.pid)
})
 