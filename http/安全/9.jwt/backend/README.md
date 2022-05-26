## 主要流程
1. 签名(sign)
```javascript
var payload = {
    id: doc._id,
    username: doc.username,
    admin: doc.admin
}
var SECRET = '666'
var options = {
    expiresIn: 600 //单位是秒
}
jwt.sign(payload, SECRET, optons);
```
> sign 会返回一个字符串， 分成三部分： `header.payload.signature`对应的base64的字符串， 以`.`分割

header的内容如下：
```javascript
// HS256 是签名算法： 另一方面, HS256 (带有 SHA-256 的 HMAC 是一种对称算法, 双方之间仅共享一个 密钥。由于使用相同的密钥生成签名和验证签名, 因此必须注意确保密钥不被泄密。
header = {
    alg:"HS256"
    kid:undefined
    typ:"JWT"
}
// 在payload 会保存对应的过期时间
payload = {
    admin:false
    exp:1587364326
    iat:1587363726
    id:ObjectID {_bsontype: "ObjectID", id: Buffer(12)}
    username:"admin"
}

function jwsSecuredInput(header, payload, encoding) {
  encoding = encoding || 'utf8';
  var encodedHeader = base64url(toString(header), 'binary');
  var encodedPayload = base64url(toString(payload), encoding);
  return util.format('%s.%s', encodedHeader, encodedPayload);
}

function jwsSign(opts) {
  var header = opts.header;
  var payload = opts.payload;
  var secretOrKey = opts.secret || opts.privateKey;
  var encoding = opts.encoding;
  var algo = jwa(header.alg); // 生成加密算法
  // securedInput: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWVjNDZhOTA3YTM0MjVhODdiMTBjMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU4NzM2NDIwNSwiZXhwIjoxNTg3MzY0ODA1fQ
  var securedInput = jwsSecuredInput(header, payload, encoding);// 将头部和payload数据进行base64位转换， 其中头部包含了算法信息
  var signature = algo.sign(securedInput, secretOrKey);// 根据算法和密钥，生成一个签名
  return util.format('%s.%s', securedInput, signature);// 所以说JWT，包含三部分，第一部分是header的相关信息，第二部分是payload的相关信息，第三部分是根据算法生成的签名
}
```
1. 验证(verify)
根据Token, SECRET, 和加密算法HS256 去验证Token
```javascript
var jwtString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWVjNDZhOTA3YTM0MjVhODdiMTBjMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU4NzM2NDQxNSwiZXhwIjoxNTg3MzY1MDE1fQ.0QUVExvWwECANAVNVNgQam19Em3Nhdkwfp2ULd4Rmdg'
// 每次生成的Token只有header是一样的，payload 和签名不一样，因为里面的时间不一样
var jwtString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWVjNDZhOTA3YTM0MjVhODdiMTBjMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU4NzM2NTU0MSwiZXhwIjoxNTg3MzY2MTQxfQ.-dMOdmKmCK95NS8ojQ73QGt6rDKlo4hBHbu9L8ADjQs'
var decodedToken.header.alg = 'HS256'
var secretOrPublicKey = '666'
valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey);

// 1. 先验证签名是否正确
function jwsVerify(jwsSig, algorithm, secretOrKey) {
  if (!algorithm) {
    var err = new Error("Missing algorithm parameter for jws.verify");
    err.code = "MISSING_ALGORITHM";
    throw err;
  }
  jwsSig = toString(jwsSig);
  var signature = signatureFromJWS(jwsSig); // 获取签名，也就是第三段
  var securedInput = securedInputFromJWS(jwsSig); // 获取输入：也就是12两段
  var algo = jwa(algorithm); // 找到对应的算法
  return algo.verify(securedInput, signature, secretOrKey);// 开始去验证
}
// 2. 在验证过期时间

if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {// 验证时间是否过期
    return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
    }
```
