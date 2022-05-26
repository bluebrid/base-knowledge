// file http-server.js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./keys/server.key'),// 服务器端私钥
  cert: fs.readFileSync('./keys/server.crt') //服务器向ca机构申请的证书， 签名过程需要 CA 的证书和私钥参与，最终颁发一个带有 CA 签名的证书
  // # 服务器端需要向 CA 机构申请签名证书，在申请签名证书之前依然是创建自己的 CSR 文件
  // openssl req -new -key server.key -out server.csr 根据服务器的私钥生成了server.csr 文件， 而服务器的向CA机构申请的证书，是根据server.csr生成的
  // openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt

  // 1.当客户端向服务端发送请求的时候，服务端会返回server.crt证书， 这个证书包含了服务器的公钥

  // 2.客户端接收到了证书后， 然后根据浏览器本地内置的证书进行校验， 判断证书是否合法

};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world');
}).listen(8000, () => {
  console.log(`服务器启动：localhost:8000`)
});