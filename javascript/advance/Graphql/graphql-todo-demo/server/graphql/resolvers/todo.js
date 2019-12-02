const R = require("ramda");
const { withFilter, PubSub } = require("graphql-subscriptions");
const TODOS_CHANGED = "TODOS_CHANGED";

const ACTIONS = {
  CREATE: "ACTIONS_CREATE",
  UPDATE: "ACTIONS_UPDATE",
  DELETE: "ACTIONS_DELETE",
  TOGGLE_ALL: "ACTIONS_TOGGLE_ALL"
};
const pubsub = new PubSub();

// 将pubsub放在context下，不知道为啥这里的subscribe拿不到这个context?

// I export my querys and mutations to join with the other resolvers
module.exports = {
  Subscription: {
    todoChanged: {
      resolve: R.prop("action"),
      subscribe: withFilter(
        (obj, args, context) => {
          return pubsub.asyncIterator(TODOS_CHANGED);
        },
        (payload, variables) => payload.clientID !== variables.filter
      )
    }
  },
  Query: {
    todos: async (root, {}, { models: { todolist } }, info) => {
      // return await todolist.find().sort({ updateTime: 1 });
      // 这里查询返回了所有的字段， 但是graphQL 只是返回了对应的字段给前端
      const todos =  await todolist.find().sort({ updateTime: 1 });
      return todos;
    },
    todos1: async (root, {}, { models: { todolist } }, info) => {
      // return await todolist.find().sort({ updateTime: 1 });
      // 这里查询返回了所有的字段， 但是graphQL 只是返回了对应的字段给前端
      const todos =  await todolist.find().sort({ updateTime: 1 });
      return todos;
    },
  },
  Mutation: {
    /**
     * const resolvers = {
        Query: {
          author(parent, args, context, info) {
            return find(authors, { id: args.id });
          },
        },
        Author: {
          books(author) {
            return filter(books, { author: author.name });
          },
        },
      };
     */
    // https://www.apollographql.com/docs/apollo-server/data/data/
    /**
     * const apolloServer = new ApolloServer({
        schema,
        context({ req }) { // 每个请求都会进入这里， 返回一个对象， 可以相当于是一个拦截器
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
      // 第一个对象是parent（root）
      // 第二个参数是传递进来的参数对象
      // 第三个参数context 就是我们在创建ApolloServer 服务的时候配置的context
      // 第四个参数是info 基本没什么用
     */
    createTodo: async (root, { title, user}, { models: { todolist }, clientID, test }, info) => {
      const id = require("uuid/v4")();
      // console.log("....>>>", id);
      let newItem = new todolist({
        title,
        // complete: false,
        id,
        // updateTime: Date.now()
      });

      await newItem.save();
      // 通知数据发生改变
      const item = await todolist.findById(newItem._id);
      pubsub.publish(TODOS_CHANGED, {
        action: { payload: [item], type: ACTIONS.CREATE },
        clientID
      });

      return item;
    },
    updateTodo: async (
      root,
      { payload },
      { models: { todolist }, clientID }
    ) => {
      const { id, complete, title } = payload;

      if (title) {
        await todolist.updateOne(
          { id },
          {
            id,
            title,
            updateTime: Date.now()
          }
        );
      } else {
        await todolist.updateOne(
          { id },
          {
            complete,
            updateTime: Date.now()
          }
        );
      }
      const item = await todolist.findOne({ id });

      pubsub.publish(TODOS_CHANGED, {
        action: { payload: [item], type: ACTIONS.UPDATE },
        clientID
      });

      return item;
    },
    toggleAll: async (
      root,
      { complete },
      { models: { todolist }, clientID }
    ) => {
      const list = await todolist.find();

      const notMatchStatusList = list.filter(
        item => item.complete !== complete
      );

      await Promise.all(
        notMatchStatusList.map(it =>
          todolist.updateOne(
            { id: it.id },
            { id: it.id, complete, updateTime: Date.now() }
          )
        )
      );

      pubsub.publish(TODOS_CHANGED, {
        action: {
          payload: [{ complete }],
          type: ACTIONS.TOGGLE_ALL
        },
        clientID
      });

      return { complete };
    },
    deleteTodos: async (root, { ids }, { models: { todolist }, clientID }) => {
      await Promise.all(ids.map(id => todolist.deleteOne({ id })));
      pubsub.publish(TODOS_CHANGED, {
        action: {
          payload: ids.map(id => ({ id })),
          type: ACTIONS.DELETE
        },
        clientID
      });
      return ids;
    }
  }
};
