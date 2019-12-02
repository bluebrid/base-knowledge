const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const R = require("ramda");
const { schema } = require("./graphql");
const { todolist } = require("./models/TodoList");

const CLIENT_ID = "linxiaowu66-client-id";

const apolloServer = new ApolloServer({
  schema,
  context({ req }) { // 每个请求都会进入这里， 返回一个对象， 可以相当于是一个拦截器, 可以通过req.body.query来查看请求的相关信息
    console.log('==================================')
    return {
      models: { todolist },
      clientID: R.path(["headers", CLIENT_ID])(req),
      test: 1
    };
  },
  playground: {// http://localhost:4000/graphql
    endpoint: "/graphql",
    settings: {
      "editor.theme": "light"
    },
    subscriptionEndpoint: "ws://localhost:4000/subscriptions"
  }
});

exports.apolloServer = apolloServer;
