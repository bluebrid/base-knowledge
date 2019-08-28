import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    //args就是: reducer, preloadedState
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
        `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args) // 重写dispatch方法，防止在中间件中执行dispatch.
    }
    //直接运行了中间件，并且将getState, dispatch 传递到中间件
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    const c = compose(...chain)
    dispatch = c(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
