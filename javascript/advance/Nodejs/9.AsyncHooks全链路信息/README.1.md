## [Node.js 应用全链路追踪技术——全链路信息获取](https://mp.weixin.qq.com/s/YGiz2T2TQ2XuRZv0cYO9mQ)

## 业界方案
1. domain： node API
   > 1. 存在严重的内存泄露，已经废弃
   > 2. zone.js： 实现方式非常的暴力， API比较晦涩，最关键的缺点是monkey patch 只能mock API , 不能mock language
   > 3. 显示传递：手动传递，中间件挂载，过于繁琐和具有侵入式，
   > 4. Async Hook: Node API
   > <font color=red>优点</font>:
   > 4.1 node 8.x 新加的一个核心模块， Node官方维护者也在使用，不存在泄露
   > 4.2 非常适合实现隐式的链路跟踪，入侵小，目前隐式跟踪的最优解；
   > 4.3 提供了 API 来追踪 node 中异步资源的生命周期；
   > 4.4 借助 async_hook 实现上下文的关联关系；

## [在 Node.js 中使用 Async Hooks 处理 HTTP 请求上下文](https://www.imooc.com/article/314801)
### Async Hooks 使用场景
1. 存储上下文
2. 异步调用之间共享数据

