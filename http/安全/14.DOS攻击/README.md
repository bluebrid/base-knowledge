DOS攻击非常流行而且相对容易处理。使用外部服务，比如cloud负载均衡, cloud防火墙, nginx, 或者（对于小的，不是那么重要的app）一个速率限制中间件(比如express-rate-limit)，来实现速率限制。

否则: 应用程序可能受到攻击, 导致拒绝服务, 在这种情况下, 真实用户会遭受服务降级或不可用。

https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/limitrequests.md