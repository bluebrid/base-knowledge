const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')
const atob = require('atob')
const auth = require('./server/auth')
const api = require('./server/api')
const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var pub = new Redis();
// 实例化一个redisClient
const redisClient = new Redis(
    {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        // family: 4, // 4 (IPv4) or 6 (IPv6)
        // password: "123456",
        db: 0
    }
)
// redisClient.send_command('config', ['set', 'notify-keyspace-events', 'KExe'], SubscribeExpired)
// //.: Subscribe to the "notify-keyspace-events" channel used for expired type events
// function SubscribeExpired(e, r) {
//     console.log('11111111111111111111111111111')
//     // sub = redis.createClient(CONF)
//     // const expired_subKey = '__keyevent@' + CONF.db + '__:expired'
//     // sub.subscribe(expired_subKey, function () {
//     //     console.log(' [i] Subscribed to "' + expired_subKey + '" event channel : ' + r)
//     //     sub.on('message', function (chan, msg) { console.log('[expired]', msg) })
//     //     TestKey()
//     // })
// }
//.: For example (create a key & set to expire in 10 seconds)
// function TestKey() {
//     pub.set('testing', 'redis notify-keyspace-events : expired')
//     pub.expire('testing', 10)
// }

// redisClient.subscribe("news", "music", function (err, count) {
//     // Now we are subscribed to both the 'news' and 'music' channels.
//     // `count` represents the number of channels we are currently subscribed to.
//     console.log('11111111111111111111111111111')
//     pub.publish("news", "Hello world!");
//     pub.publish("music", "Hello again!");
// });

// redisClient.psubscribe("__keyevent@0__:expired", function (err, count) {
//     // Now we are subscribed to both the 'news' and 'music' channels.
//     // `count` represents the number of channels we are currently subscribed to.
//     console.log('11111111111111111111111111111')
//     // pub.publish("news", "Hello world!");
//     // pub.publish("music", "Hello again!");
// });

// redisClient.on("message", function (channel, message) {
//     // Receive message Hello world! from channel news
//     // Receive message Hello again! from channel music
//     console.log("Receive message %s from channel %s", message, channel);
// });

// // There's also an event called 'messageBuffer', which is the same as 'message' except
// // it returns buffers instead of strings.
// redisClient.on("messageBuffer", function (channel, message) {
//     // Both `channel` and `message` are buffers.
// });
const PORT = 3001
// 给node全局增加atob方法
global.atob = atob
// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // 用于给session加密
    server.keys = ['ssh develop github app']
    // 解析post请求的内容
    server.use(koaBody())

    const sessionConfig = {
        // 设置到浏览器的cookie里的key
        key: 'sid',
        // 将自定义存储逻辑传给koa-session
        store: new RedisSessionStore(redisClient),
    }
    server.use(session(sessionConfig, server))

    // 处理github Oauth登录
    auth(server)
    // 处理github请求代理
    api(server)



    router.get('/api/user/info', async (ctx) => {
        const { userInfo } = ctx.session
        if (userInfo) {
            ctx.body = userInfo
            // 设置头部 返回json
            ctx.set('Content-Type', 'application/json')
        } else {
            ctx.status = 401
            ctx.body = 'Need Login'
        }
    })

    server.use(router.routes())

    server.use(async (ctx) => {

        // req里获取session
        ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(PORT, () => {
        console.log(`koa server listening on ${PORT}`)
    })
})


    // router.get('/a/:id', async (ctx) => {
    //     const { id } = ctx.params
    //     await handle(ctx.req, ctx.res, {
    //         pathname: '/a',
    //         query: {
    //             id,
    //         },
    //     })
    //     ctx.respond = false
    // })


