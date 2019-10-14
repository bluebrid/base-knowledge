/**
 * https://juejin.im/post/5c0e6d606fb9a049f66bf246
 * https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651555214&idx=1&sn=f061ff032e06b8560c5a3832404d4cf5&chksm=8025524fb752db59010d0912042a5a3a7a4bacba25a188f73bebdbb51b09da2ef1e948ebe97e&mpshare=1&scene=1&srcid=1009ALgtvqn4oY8qJzefUdVv&sharer_sharetime=1570582899137&sharer_shareid=3efb78b5e058f0088976a184d31a463b&key=1d1ca7b6df234b6ee858eaf901b96cd7b8bfe56bb655eceed04606991027fb4e3b6f18f57bdb508bac381a3514439ba602ad80930ac843dbcaa00d6ead6418160cdf2efcec404bbdd38290225fdcca64&ascene=1&uin=MjEwNzg0ODc4Mg%3D%3D&devicetype=Windows+10&version=62060833&lang=en&pass_ticket=TPfwUsZ8CH7MADNbYTHN6esleeUp1earhxVO7mZeXF3hnGKdngjzPSik5%2BP%2F3SW%2B
 * 1. 浏览器跨域禁止的是ajax请求(XMLHTTPRequest)，而不是文件的请求
 * 
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

