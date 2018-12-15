const http = require('http')

const PORT = 9999
const allowOrigin = ['http://127.0.0.1:8080', 'http://localhost:8080', 'https://www.baidu.com']

const server = http.createServer((request, response) => {
    const { method, headers: { origin, cookie } } = request
    if (allowOrigin.includes(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin)
    }
    response.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE')
    response.setHeader('Access-Control-Allow-Credentials', true)
    response.setHeader('Access-Control-Allow-Headers', 'token, sesssionId, Content-Type')
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