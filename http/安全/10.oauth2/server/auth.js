// 处理github返回的auth code
const axios = require('axios')
const config = require('../config')
const { client_id, client_secret, request_token_url, github_user_url } = config.github

module.exports = (server) => {
    server.use(async (ctx, next) => {
        // 1. Github auth 登录后的回调接口
        if (ctx.path === '/auth') {
            const { code } = ctx.query
            if (code) {
                // 2. 获取Oauth鉴权信息
                const result = await axios({
                    method: 'POST',
                    url: request_token_url,
                    data: {
                        client_id,
                        client_secret,
                        code,
                    },
                    headers: {
                        Accept: 'application/json',
                    },
                })
                // github 可能会在status是200的情况下返回error信息
                if (result.status === 200 && (result.data && !result.data.error)) {
                    ctx.session.githubAuth = result.data
                    const { access_token, token_type } = result.data
                    // 3. 获取用户信息
                    const { data: userInfo } = await axios({
                        method: 'GET',
                        url: github_user_url,
                        headers: {
                            Authorization: `${token_type} ${access_token}`,
                        },
                    })

                    ctx.session.userInfo = userInfo
                    // 重定向到登录前的页面或首页
                    ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
                    ctx.session.urlBeforeOAuth = ''
                } else {
                    ctx.body = `request token failed ${result.data && result.data.error}`
                }
            } else {
                ctx.body = 'code not exist'
            }
        } else {
            await next()
        }
    })

    // 登出逻辑
    server.use(async (ctx, next) => {
        const { path, method } = ctx
        if (path === '/logout' && method === 'POST') {
            ctx.session = null
            // await ctx.sessionOptions.store.destroy()
            ctx.body = 'logout success'
        } else {
            await next()
        }
    })

    // 在进行auth之前 记录请求时的页面url
    server.use(async (ctx, next) => {
        const { path, method } = ctx
        if (path === '/prepare-auth' && method === 'GET') {
            const { url } = ctx.query
            //存储 url
            ctx.session.urlBeforeOAuth = url
            //跳转授权重定向 维持OAuth之前得页面访问
            ctx.redirect(config.OAUTH_URL)
        } else {
            await next()
        }
    })
}
