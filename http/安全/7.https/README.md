https://www.barretlee.com/blog/2015/10/05/how-to-build-a-https-server/

https://juejin.im/post/5d53aa04f265da03934bd70c

https://juejin.im/post/58a8f3295c497d005fbd58b1#comment

https://juejin.im/post/5c889918e51d45346459994d

## 生成秘钥和证书

### 生成服务端的公钥和私钥
```shell
openssl genrsa -out server.key 1024
```
上面的脚本生成的`server.key`是一个公钥
```shell
openssl rsa -in server.key -pubout -out server.pem
```
上面的脚本根据公钥生成了一个私钥, 私钥是不会发送给客户端(**浏览器**)

### 生成CA证书
下面我们来生成一个CA证书
1. 首先需要生成一个CA的私钥
```shell
openssl genrsa -out ca.key 1024
```
2. 根据私钥生成CA证书(也就是CA机构中心)
```shell
# X.509 Certificate Signing Request (CSR) Management.
openssl req -new -key ca.key -out ca.csr
# X.509 Certificate Data Management.
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt

```
### 向CA机构申请一个服务端证书

我们在第二步已经相当于是创建了一个CA机构中心， 但是我们的服务需要向CA申请一个自己的独立的证书
```shell
# 服务器端需要向 CA 机构申请签名证书，在申请签名证书之前依然是创建自己的 CSR 文件
openssl req -new -key server.key -out server.csr
# 向自己的 CA 机构申请证书，签名过程需要 CA 的证书和私钥参与，最终颁发一个带有 CA 签名的证书
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
```

上面创建的`server.crt`也就是相当于是我们创建的一个独立的CA证书，我们在创建`server.crt`证书的时候，其实是包含了`server.key`的信息(也就是第一步我们给我们自己的服务创建的一个**公钥**, 也就是服务器返回给客户端(**浏览器**)的证书其实是包含了我们服务的**公钥**信息)

### 创建一个https的服务(也就是我们的服务)
我们通过**NodeJS** 创建一个**https** 的服务：
```javascript
// file http-server.js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./keys/server.key'),// 服务器端私钥
  cert: fs.readFileSync('./keys/server.crt')  
};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world 8000');
}).listen(8000, () => {
  console.log(`服务器启动：localhost:8000`)
});
```

然后我们可以通过浏览器打开`https://localhost:8000`, 页面会输出`hello world`, 其实也就是相当于我们已经创建了一个`https`的请求服务了.

## 创建一个新的服务
如果我们还有一个新的服务`https://localhost:8001`, 我们需要重复以下操作：
1. 生成服务端的公钥和私钥
```shell
# 生成服务器端私钥
openssl genrsa -out server8001.key 1024
# 生成服务器端公钥
openssl rsa -in server8001.key -pubout -out server8001.pem
```
2. 向CA机构申请一个服务端证书
```shell
# 服务器端需要向 CA 机构申请签名证书，在申请签名证书之前依然是创建自己的 CSR 文件
openssl req -new -key server8001.key -out server8001.csr
# 向自己的 CA 机构申请证书，签名过程需要 CA 的证书和私钥参与，最终颁发一个带有 CA 签名的证书
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server8001.csr -out server8001.crt
```
3. 创建一个新的服务
创建一个https的服务(也就是我们的服务)
我们通过**NodeJS** 创建一个**https** 的服务：
```javascript
// file http-server.js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./keys/server8001.key'),// 服务器端私钥
  cert: fs.readFileSync('./keys/server8001.crt')  
};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world 8001');
}).listen(8000, () => {
  console.log(`服务器启动：localhost:8001`)
});
```