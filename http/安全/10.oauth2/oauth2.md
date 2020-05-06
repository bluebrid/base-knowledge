[不要用JWT替代session管理（上）：全面了解Token,JWT,OAuth,SAML,SSO](https://juejin.im/post/5b3b870a5188251ac85826b8)

## 基本流程（http\安全\10.oauth2\server\auth.js）
1. 首先你需要向 Google API 注册你的应用程序，注册完毕之后你会拿到认证信息（credentials）包括
ID 和 secret。不是所有的程序类型都有 secret。
2. 接下来就要向 Google 请求 access token。这里我们先忽略一些细节，例如请求参数（当然需要上面申请到的 secret）以及不同类型的程序的请求方式等。重要的是，如果你想访问的是用户资源，这里就会提醒用户进行授权。
3. 如果用户授权完毕。Google 就会返回 access token。又或者是返回授权代码（authorization code），你再通过代码取得 access token
4. token 获取到之后，就能够带上 token 访问 API 了

 