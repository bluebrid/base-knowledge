import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  // return enhancer(createStore)(reducer, preloadedState)
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    /**
      export default function customLogger({ getState }) {
        return next => action => {
          console.log('will dispatch', action)
      
          // Call the next dispatch method in the middleware chain.
          const returnValue = next(action)
      
          console.log('state after dispatch', getState())
      
          // This will likely be the action itself, unless
          // a middleware further in chain changed it.
          return returnValue
        }
      }
     */
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    /**
     * export default function compose(...funcs) {
        if (funcs.length === 0) {
          return arg => arg
        }

        if (funcs.length === 1) {
          return funcs[0]
        }

        return funcs.reduce((a, b) => (...args) => a(b(...args)))
      }
     */
    /**
     * 1. 如果配置了中间件，会在这个方法中重新调用createStore方法重新创建一个store, 并且将dispatch 重新包装
     * 2. 中间件的意义就是重新封装dispatch 函数
     * 
     */
    const composeResult = compose(...chain)
    dispatch = composeResult(store.dispatch)
    console.log(dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
