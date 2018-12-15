/**
 * https://juejin.im/post/5c0e6d606fb9a049f66bf246
 */
const http = require('http')
const url = require('url')
const PORT = 9999
http.createServer((req, res) => {
    const queryObj = url.parse(req.url, true).query;
    const result = {
        name: 'ivan fan',
        age: 18
    }
    res.end(`${queryObj.callback}(${JSON.stringify(result)})`);
}).listen(PORT, () => {
    console.log('Start server 127.0.0.1:' + PORT)
})

