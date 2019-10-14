const http = require('http')

/**
 * 1. 客户端请求时，判断是否是跨域请求，如果是跨域请求，自动携带请求头Origin
 * 2. 会根据请求Method,头部，Content-Type类型来判断是Hi简单请求还是非简单请求
 * 3. 如果是非简单请求，浏览器会自动发送一个Option 预检的请求，判断是否合法跨域请求
 * 4. 如果是合法请求再发一个真实的请求
 * 5. 如果是一个简单的请求就直接请求，不用发送一个Option预检请求
 * 6. 如果是简单的请求，如果相应体携带 Access-Control-Allow-Origin 则表示是一个合法的请求，否则浏览器会抛出一个错误，被XMLHTTPRequest的onError回调函数捕获
 *    不同意：服务器会返回一个正常的HTTP回应（响应头里木有Access-Control-Allow-Origin这个头），浏览器发现木有这个头，就抛出一个错误XMLHttpRequest，
 *    进而进入ajax的onerror回到方法里（这就是为何你明明看到http状态码是200，response也有返回值，但偏偏你ajax里就是进入的error的原因~），
 *    它的现象是：服务器正常返回了资源，但浏览器拒绝接收了。 https://cloud.tencent.com/developer/article/1513418
 */
const PORT = 9999
const allowOrigin = ['http://127.0.0.1:8080', 'http://localhost:8080', 'https://www.baidu.com']

const server = http.createServer((request, response) => {
    const { method, headers: { origin, cookie } } = request
    if (allowOrigin.includes(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin)
    }
    // 七. If request method is not a case-sensitive match for any method in methods and is not a simple method, apply the cache and network error steps.
    // 简单请求GET,HEAD, POST 这个三个请求是不需要特意设置Access-Control-Allow-Methods， 但是如果请求是PUT， 又没有设置Access-Control-Allow-Methods， 是预检不会成功的
    response.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE')
    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。
    // 这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
    response.setHeader('Access-Control-Allow-Credentials', true)
    // 如果请求头部携带了自定义的头部信息，但是在这里没有设置， 也是不能跨域请求成功
    response.setHeader('Access-Control-Allow-Headers', 'token, sesssionId, Content-Type')
    // https://www.cnblogs.com/silence-Bear/p/8178003.html
    response.setHeader("Access-Control-Max-Age", "60");  // 预检有效保持时间 
    // 如果不设置暴露的自定义的Headers, 则在客户端是不能获取对应的Header
    // 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
    // Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
    // 如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回
    response.setHeader('Access-Control-Expose-Headers', 'token, sesssionId, Content-Type')
    
    response.setHeader('token', 'quanquan')
    if (method === 'OPTIONS') {
      response.writeHead(204)
      response.end('')
    } else if (!cookie) {
      response.setHeader('Set-Cookie', 'quanquan=fe')
    }
    response.end("{name: 'quanquan', friend: 'guiling'}")
  });
  
  server.listen(PORT, () => {
    console.log('服务启动成功, 正在监听: ', PORT)
  });