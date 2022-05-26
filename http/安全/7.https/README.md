CA证书生成指引
https://www.barretlee.com/blog/2015/10/05/how-to-build-a-https-server/

openssl 命令目录
https://www.cnblogs.com/aixiaoxiaoyu/p/8650180.html

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
# a.根据私钥ca.key生成一个新的证书请求文件。其中"-new"表示新生成一个新的证书请求文件，
# "-key"指定私钥文件，"-out"指定输出文件，此处输出文件即为证书请求文件。
openssl req -new -key ca.key -out ca.csr
# x509 表示自签署证书，可用于自建根CA时。
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
# 上面两个步骤可以合并为： openssl req -x509 -key ca.key -in ca.csr -out ca.crt -days 365

```
### 向CA机构申请一个服务端证书

我们在第二步已经相当于是创建了一个CA机构中心， 但是我们的服务需要向CA申请一个自己的独立的证书
```shell
# 服务器端需要向 CA 机构申请签名证书，在申请签名证书之前依然是创建自己的 CSR 文件
openssl req -new -key server.key -out server.csr
# 向自己的 CA 机构申请证书，签名过程需要 CA 的证书和私钥参与，最终颁发一个带有 CA 签名的证书
openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
```
向证书机构提交公钥、组织信息、个人信息(域名)等信息并申请认证，<font size=5 color=red>申请证书不需要提供私钥，确保私钥永远只能服务器掌握</font>。
<font size=5 color=red>证书 = 公钥(客户的) + 申请者信息(组织名称， 密码，邮箱等信息)与颁发者信息(CA的根证书， 私钥) + 数字签名</font>

在上面申请服务端证书的时候， CA中心会收集相应的客户信息，如：组织名称， 密码，邮箱等信息。

**重点**
我们在创建客户的CA证书的时候，其实这个证书里面包含了CA机构对应的**私钥** 和**CA** 证书，才生成了客户的**签名证书**

也就是如果客户端(浏览器)在验证我们的从服务器请求回来的证书是否合法，会根据浏览器内置的**CA机构**的证书和我们的获取到的**服务器证书** 来做校验，

因为**服务器证书** 是根据CA机构对应的**私钥** 和**CA** 证书, 也就是说服务器返回的证书其实包含CA机构证书的相关信息，所以才能校验。

<font size=5 color=red>证书机构的CA证书内置在浏览器或操作系统中，也就是客户端本地，称之为CA根证书。

CA证书如果放在远程，那这又涉及到请求，又会有被中间人篡改的风险，所以浏览器内置了一些知名证书机构的CA根证书，客户端根据颁发者信息去找到对应的CA证书进行验证。</font>

![](https://user-gold-cdn.xitu.io/2019/12/20/16f213db7c9bc70b?w=2900&h=2000&f=jpeg&s=356840)
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