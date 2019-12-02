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
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema
        },
        {
          server: server,
          path: "/subscriptions"
        }
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
