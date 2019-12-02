import { graphql } from 'react-apollo';
import * as R from 'ramda';
import ACTIONS from '../constants';
import { TODOS_QUERY, TODOS_QUERY1} from './query';
import {
  CREATE_TODO_MUTATION,
  EDIT_TODO_MUTATION,
  TOGGLE_TODO_MUTATION,
  TOGGLE_ALL_MUTATION,
  DELETE_TODOS_MUTATION
} from './mutation';
import { TODO_SUBSCRIPTION } from './subscription';

export const withTodos1 = graphql(TODOS_QUERY1, {
  alias: 'withTodos1',
  props: opts => {
    return {
      todos1: opts.data
    };
  }
});
export const withTodos = graphql(TODOS_QUERY, {
  alias: 'withTodos',
  props: opts => {
    /**
     *      var result = Object.assign(r, data || {});
          var name = operationOptions.name || 'data';
          var childProps = (_b = {}, _b[name] = result, _b);

          if (operationOptions.props) {
            var newResult = (_c = {}, _c[name] = result, _c.ownProps = props, _c);
            lastResultProps = operationOptions.props(newResult, lastResultProps);
            childProps = lastResultProps;
          }

          return createElement(WrappedComponent, __assign({}, props, childProps)); 
          // 创建了一个新的组件， 并且有新的props
          // 所以在组件中，可以通过props.todos直接访问data数据
     */
    return {
      todos: opts.data,
      // todos: [],
      subscribeTodoChanged: (
        clientID // subscribeTodoChanged 只是暴露出的一个props, 在Layout 的componentDidMount 执行，也就是去监听
      ) =>
        opts.data.subscribeToMore({
          // subscribeToMore 是内置方法
          document: TODO_SUBSCRIPTION,
          variables: { filter: clientID },
          updateQuery: (
            { todos },
            {
              subscriptionData: {
                errors,
                data: {
                  todoChanged: { payload, type }
                }
              }
            }
          ) => {
            // 订阅回调函数， 只有通过http://localhost:4000/graphql添加数据会进行广播
            if (errors) console.log({ errors });

            // Remind: this is a reducer by type
            switch (type) {
            case ACTIONS.CREATE: {
              const index = R.findIndex(R.propEq('id', payload[0].id))(todos);
              if (index === -1) {
                return { todos: R.prepend(payload[0])(todos) };
              }
              console.log('[ACTIONS.CREATE] duplicated key?');
              return { todos };
            }
            case ACTIONS.UPDATE: {
              const index = R.findIndex(R.propEq('id', payload[0].id))(todos);
              return {
                todos: R.adjust(R.merge(R.__, payload), index)(todos)
              };
            }
            case ACTIONS.DELETE: {
              const ids = R.pluck('id')(payload);
              return {
                todos: R.filter(todo => !ids.includes(todo.id))(todos)
              };
            }
            case ACTIONS.TOGGLE_ALL: {
              const { complete } = payload[0];
              // const index = R.findIndex(R.propEq('id', payload[0].id))(todos);
              const setItem = R.set(R.lensProp('complete'), complete);

              return { todos: R.map(setItem)(todos) };
            }
            default:
              return todos;
            }
          }
        })
    };
  }
});

/**
 * Create HOC
 */
const withCreateTodoHOC = graphql(CREATE_TODO_MUTATION, {
  alias: 'withCreateTodo',
  props: opts => {
    /**
     *   if (operationOptions.props) {
            var newResult = (_c = {}, _c[name] = mutate, _c[resultName] = result, _c.ownProps = props, _c);
            childProps = operationOptions.props(newResult);
          }
          这里执行props函数：传递的其实是一个newResult的对象参数：
          {
            mutate: ƒ (options)
            ownProps: {todos: {…}, subscribeTodoChanged: ƒ}
            result: {called: false, loading: false, error: undefined, client: ApolloClient}
 
          }
     */
    console.log('====================');
    return {
      // if (text.length !== 0) this.props.createTodo({ title: text });, 这个props: 里面的属性就是HOC 里面的propss
      createTodo: (
        { title } // 这个title是在React组件中传递进来的参数
      ) =>
        opts.mutate({
          variables: { title },
          optimisticResponse: {
            __typename: 'Mutation',
            createTodo: {
              __typename: 'Todo',
              title
            }
          },
          update: (proxy, { data: { createTodo } }) => {
            // 更新后， 去查询新的数据
            const prevState = proxy.readQuery({ query: TODOS_QUERY });
            const lens = R.lensProp('todos');
            const data = R.over(lens, R.prepend(createTodo))(prevState);
            proxy.writeQuery({ query: TODOS_QUERY, data });
          }
        })
    };
  }
});
export const withCreateTodo = withCreateTodoHOC;
/**
 * Edit HOC
 */
export const withEditTodo = graphql(EDIT_TODO_MUTATION, {
  alias: 'withEditTodo',
  props: ({ mutate }) => ({
    editTodo: ({ id, title }) =>
      mutate({
        variables: { id, title },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            __typename: 'Todo',
            id,
            title
          }
        }
      })
  })
});

/**
 * Toggle HOC
 */
export const withToggleTodo = graphql(TOGGLE_TODO_MUTATION, {
  alias: 'withToggleTodo',
  props: ({ mutate }) => ({
    toggleTodo: ({ id, complete }) =>
      mutate({
        variables: { id, complete },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            __typename: 'Todo',
            id,
            complete
          }
        }
      })
  })
});

/**
 * Toggle HOC
 */
export const withToggleAll = graphql(TOGGLE_ALL_MUTATION, {
  alias: 'withToggleAll',
  props: ({ mutate }) => ({
    toggleAll: complete =>
      mutate({
        variables: { complete },
        optimisticResponse: {
          __typename: 'Mutation',
          toggleAll: {
            __typename: 'Todo',
            complete
          }
        },
        update: (proxy, { data: { toggleAll } }) => {
          // proxy: InMemoryCache 对象内存数据
          /**
             this.cache.performTransaction(function (c) {
              cacheWrites_1.forEach(function (write) {
                return c.write(write);
              });
              var update = mutation.update;

              if (update) {
                tryFunctionOrLogError(function () {
                  return update(c, mutation.result);
                });
              }
            });
           */
          // 通过内存查询之前的数据
          const prevState = proxy.readQuery({ query: TODOS_QUERY });
          // 设置相应的数据
          const setItem = R.set(R.lensProp('complete'), toggleAll.complete);
          const data = R.evolve({ todos: R.map(setItem) })(prevState);
          // 重新复写内存的数据
          proxy.writeQuery({ query: TODOS_QUERY, data });
        }
      })
  })
});

/**
 * Delete HOC
 */
export const withDeleteTodos = graphql(DELETE_TODOS_MUTATION, {
  alias: 'withDeleteTodos',
  props: ({ mutate }) => ({
    deleteTodos: todos => {
      const ids = R.pluck('id')(todos);

      return mutate({
        variables: { ids },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteTodos: ids
        },
        update: (proxy, { data: { deleteTodos } }) => {
          const prevState = proxy.readQuery({ query: TODOS_QUERY });
          const lens = R.lensProp('todos');
          const filter = R.filter(todo => !deleteTodos.includes(todo.id));
          const data = R.over(lens, filter)(prevState);
          proxy.writeQuery({ query: TODOS_QUERY, data });
        }
      });
    }
  })
});
