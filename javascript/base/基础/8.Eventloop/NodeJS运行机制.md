https://blog.csdn.net/qq_41257129/article/details/100743394
## NodeJS 
1. Nodejs 是基于**事件驱动**，**异步非阻塞**的机制，运行，所以实用与密集型IO，高并发场景
2. 上层是Node Standard Lib (NodeJS 的标准库)
3. 中间是： Node Bindings, 也就是Node与底层C, C++沟通的关键，nodejs,通过bindings调用c/C++相互进行数据的交互
4. V8引擎是解析Javascript 脚本的
5. libuv库负责Node API 执行， 将不同的任务分配给不同的线程， 形成了一个**EventLoop**,然后又以**异步**的方式，将结果返回给**v8引擎**
6. libuv, 是Nodejs 能实现跨平台的关键
7. V8 在将结果返回给用户

## libuv 
![](https://img-blog.csdnimg.cn/20190911180428488.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjU3MTI5,size_16,color_FFFFFF,t_70)

外部输入数据–>轮询阶段(poll)–>检查阶段(check)–>关闭事件回调阶段(close callback)–>定时器检测阶段(timer)–>I/O事件回调阶段(I/O callbacks)–>闲置阶段(idle, prepare)–>轮询阶段（按照该顺序反复运行）…

1. timers阶段： 执行timer（setTimeout 、setInterval）的回调

2. I/O callbacks阶段： 处理一些上一轮循环中少数未执行的I/O回调

3. idle,prepare阶段： 仅Node内部使用

4. poll阶段： 获取新的I/O事件，适当的条件下node将阻塞在这里。（发生阻塞的情况为：poll队列为空，且没有代码设定为setImmediate（））

5. check阶段: 执行**setImmediate（）**的回调。（如果poll阶段空闲，并且有被setImmediate()设定的回调，那么事件循环直接跳到check执行，而不是阻塞在poll阶段等待回调被加入）

## Node与浏览器的EventLoop 的差异
1. 浏览器环境下，microtask的任务队列是每个macrotask执行完成之后执行。
2. 而在node.js中，microtask会在事件循环的各个阶段之间执行，也就是说，每一个阶段执行完毕，就会去执行microtask队列中的任务。
![](https://img-blog.csdnimg.cn/20190911192413535.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjU3MTI5,size_16,color_FFFFFF,t_70)