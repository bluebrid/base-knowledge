const mongo = require("mongoose");
const path = require("path");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { apolloServer } = require("./apollo-config");
const { schema } = require("./graphql");
require("./env");
// http://localhost:4000/graphql
// http://mongoosejs.net/docs/connections.html
const app = express();

/**
 *  public applyMiddleware({ app, ...rest }: ServerRegistration) {
    app.use(this.getMiddleware(rest));
  }
  这里执行apolloServer.applyMiddleware({ app }); 其实就是给express 添加一个中间件
   if (!path) path = '/graphql'; // 所以默认的是拦截/graphql, 

    const router = express.Router();

    router.use(path, (_req, _res, next) => {
      promiseWillStart.then(() => next()).catch(next);
    });
 */
apolloServer.applyMiddleware({ app });

app.use(
  express.static(path.join(__dirname, "../client/build"), { maxAge: 86400000 })
);

// Create webSocketServer
const server = createServer(app);

// Configure params for mongoConnection
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// 当mongodb 连接成功了采取启动node 服务
mongo
  .connect(process.env.URI, options)
  .then(() => {
    // If connected, then start server
    server.listen(process.env.PORT, () => {
      console.log("Server on port", process.env.PORT);
      console.log("Mongo on port: ", process.env.DBPORT);
      // Set up the WebSocket for handling GraphQL subscriptions
      // function SubscriptionServer(options, socketOptionsOrServer) {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema
        },
        {// this.wsServer = new WebSocket.Server(socketOptionsOrServer || {}); 通过webSocket 库创建一个连接
          /**
           * if (this._server) {
              this._removeListeners = addListeners(this._server, {
                listening: this.emit.bind(this, 'listening'),
                error: this.emit.bind(this, 'error'),
                upgrade: (req, socket, head) => { // 监听upgrade 事件
                  this.handleUpgrade(req, socket, head, (ws) => {
                    this.emit('connection', ws, req);
                  });
                }
              });
            }

           * 在websocket 中通过如下方法绑定server
           * function addListeners (server, map) {
              for (const event of Object.keys(map)) server.on(event, map[event]);

              return function removeListeners () {
                for (const event of Object.keys(map)) {
                  server.removeListener(event, map[event]);
                }
              };
            }
            在node_modules\subscriptions-transport-ws\dist\server.js进行监听connection 事件
        this.wsServer.on('connection', connectionHandler);
        this.closeHandler = function () {
            _this.wsServer.removeListener('connection', connectionHandler);
            _this.wsServer.close();
        };
           */
          server: server,
          path: "/subscriptions"// 这个是websocket 的路径
        }
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
