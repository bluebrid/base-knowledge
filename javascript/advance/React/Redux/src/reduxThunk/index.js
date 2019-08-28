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
const extraArgument = {}
export default (store) => {
  return (next) => {
    return (action) => {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState, extraArgument);
      }

      return next(action);
    }
  }
}