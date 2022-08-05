DOS攻击非常流行而且相对容易处理。
使用外部服务，比如cloud负载均衡, cloud防火墙, nginx, 
或者（对于小的，不是那么重要的app）一个速率限制中间件(比如express-rate-limit)，来实现速率限制。

否则: 应用程序可能受到攻击, 导致拒绝服务, 在这种情况下, 真实用户会遭受服务降级或不可用。

https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/limitrequests.md

## 预防策略
1. HTTP请求拦截
> 1. 专用硬件： 在Web服务器前面架设一层硬件防火墙，这种效果最好，但是价格昂贵
> 2. 本机防火墙： 操作系统都带了防火墙
> 3. web服务器：nginx 配置deny
2. 宽带自动扩容
4. CDN
