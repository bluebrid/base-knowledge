var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./keys/server8001.key'),// 服务器端私钥
  cert: fs.readFileSync('./keys/server8001.crt')  
};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world 8001');
}).listen(8001, () => {
  console.log(`服务器启动：localhost:8001`)
});