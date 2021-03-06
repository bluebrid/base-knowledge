/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/

const http = require("http");
const fs = require("fs");
const ws = new require("./ws");

const wss = new ws.Server({ noServer: true });

const clients = new Set();

function accept(req, res) {
  if (
    req.url == "/ws" &&
    req.headers.upgrade &&
    req.headers.upgrade.toLowerCase() == "websocket" &&
    // 可以是 Connection: keep-alive, Upgrade
    req.headers.connection.match(/\bupgrade\b/i)
  ) {
    // wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == "/") {
    // index.html
    fs.createReadStream("./index.html").pipe(res);
  } else {
    // 页面不存在
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on("message", function(message) {
    log(`监听message事件 received: ${message}`);

    message = message.slice(0, 50); // 最大消息长度为 50
    message = message === "ping" ? "pong" : message;
    for (let client of clients) {
      client.send(message);
    }
  });

  ws.on("close", function() {
    log(`connection closed`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http
    .createServer(accept)
    .on("upgrade", function upgrade(req, socket, head) {
      wss.handleUpgrade(req, socket, head, onSocketConnect);
    })
    .listen(8080);
} else {
  // 嵌入 javascript.info
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}
