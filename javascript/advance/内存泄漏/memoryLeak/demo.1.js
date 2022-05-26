const easyMonitor = require('easy-monitor')
const http = require('http')

easyMonitor('test9')

let leakArray = []
let leak = function () {
    leakArray.push(new Array(10 * 1024 * 1024).fill(0))
}
http.createServer(function (req, res) {
    leak()
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
}).listen(3000)

console.log('Server running at http://127.0.0.1:3000/')