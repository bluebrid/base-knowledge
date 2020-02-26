/*
function createThunkMiddleware(extraArgument) {
    return (store) => next => action => {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState, extraArgument);
      }
  
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;
  */

/**
 * store 是个包含getState 和dispatch 方法的对象
 * {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args) // 重写dispatch方法，防止在中间件中执行dispatch.
    }
    防止在中间件执行dispatch ，所以将dispatch 重写了。
    中间件的写法是: store => next => next => {
      return next(action);
    }
 */
// const store = createStore(reducer, applyMiddleware(thunk));
// https://blog.csdn.net/baidu_41601048/article/details/100177366
const extraArgument = {}
export default (store) => {
  return (next) => {
    return (action) => { 
      // 整个action 就是我们的传入进来的action , reducer 原本只能接受一个为对象的action(而且必须要有type)
      // 我们在触发事件(click)的时候，会用dispatch 进行状态的变更
      // 而dispatch 是redux的内置的方法，我们没法去变更，而action则是一个对象，
      // 我们可以在action 上面打主意，让action 成为一个function, 并且将dispatch 作为参数传递给action function
      // 然后我们可以执行action ,可以在action 方法的对应的地方再次执行dispatch.
      // 其实就相当于将dispatch 函数先保存下来，在异步完成后，再次执行dispatch函数，然后相当于异步也就处理了。
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState, extraArgument);
      }

      return next(action);
    }
  }
}