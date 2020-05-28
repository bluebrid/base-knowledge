## Redux
Redux 主要暴露如下五个方法：

1. createStore
2. combineReducers
3. bindActionCreators
4. applyMiddleware
5. compose

### createStore 方法

我们在使用Redux的时候，首先需要创建一个store:
```javascript
const store = createStore(
  reducer,
  applyMiddleware(
    createLogger({}),
    customLogger)
);
```
而createStore方法签名的如下：
```javascript
export default function createStore(reducer, preloadedState, enhancer) 
```
1. 可以接受三个参数
2. 第一个参数必须是reducer
3. 参数校验逻辑如下：
> 1. 如果第二个和第三个参数都存在，而且都是function 是不允许的
> 2. 如果第二个参数存在，而且是一个function , 则会将第二个参数设置enhancer 也就是中间件
4. 如果有enhancer 则会执行运行enhancer
```javascript
 return enhancer(createStore)(reducer, preloadedState)
```
5. enhancer 从上面我们执行`createStore`方法可以看到其实就是执行`applyMiddleware`的一个返回函数，其函数签名如下：
```javascript
return createStore => (...args) => {
    const store = createStore(...args)
    // 在中间件中直接执行dispatch 方法是不允许的
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
```
6. 从上面的方法中可知，在中间件中会调用`createStore`方法创建一个store

7. 在`createStore`中会运行` dispatch({ type: ActionTypes.INIT })` 去初始化相应的数据，如`currentState = currentReducer(currentState, action)`

### dispatch 方法

dispatch 的方法签名是`function dispatch(action) `, 传递的参数是一个`action`,`action` 有如下要求：

> 1. action 必须是一个简单地Object
> 2. action 必须有`type`属性

1. dispatch 就是根据action和currentState 通过reducer 计算出新的当前状态` currentState = currentReducer(currentState, action)`

2. currentReducer 就是我们在初始化createStore传递进来的第一个参数reducer

3. crrentReducer 的主要逻辑是：
```javascript
   for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      
      const reducer = finalReducers[key]
      // 先获取之前的状态
      const previousStateForKey = state[key]
      // 执行reducer函数， 返回新的state,如果是第一次初始化状态， 则必须要有default 值
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 将新的状态保存在nextState
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 返回新的状态
    return hasChanged ? nextState : state
```
4. dispatch 方法返回的是`action`

### applyMiddleware 方法

`applyMiddleware`就是传入一组`middleware`然后返回一个新的方法，返回的方法签名是：
```javascript
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
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    const composeResult = compose(...chain)
    // 中间件的作用其实就是重新封装了dispatch函数
    dispatch = composeResult(store.dispatch)
    console.log(dispatch)
    return {
      ...store,
      dispatch
    }
```
在上面回去执行每一个中间件，并且每一个中间件都会返回一个新的方法：
```javascript
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
 
```
从上面可以分析每个中间件都会接收一个`middlewareAPI` 对象的参数：
```javascript
  const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
```

`const composeResult = compose(...chain)` 方法就是去遍历每一个中间件,compose 代码逻辑如下：

```javascript

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // return funcs.reduce((a, b) => (...args) => a(b(...args)))
  // 返回的是一个函数， 一层层的去包裹传递进来的中间件， 执行是从右到左执行， 也就是说， 在配置applyMiddleware中间件的时候，传递的参数从右到左执行
  return funcs.reduce((a, b) => {
    return (...args) => {
      return a(b(...args)) 
    }
  })
}

```

<font size=5 color=red>中间件的作用其实就是重新封装了dispatch函数！！！</font>

## react-redux 组件
redux是对所有框架都是用的一个库，但是react-redux 是React针对redux 进行封装的一个库，他主要暴露了如下几个方法：
```javascript
  Provider, 
  connectAdvanced,
  ReactReduxContext,
  connect,
  batch,
  useDispatch,
  createDispatchHook,
  useSelector,
  createSelectorHook,
  useStore,
  createStoreHook,
  shallowEqual
```

### Provider 组件

Provider 是一个组件， 组件签名`function Provider({ store, context, children }) `, 一般而言我们只会传递`store`和`children`两个props
```javascript
 <Provider store={store}>
    <App />
    <DevTools />
  </Provider>
```
因为我们没有传递第二个参数`context`, 所以Provider组件其实就是React的原生的`React.createContext`创建的一个context
```javascript
const Context = context || ReactReduxContext
return <Context.Provider value={contextValue}>{children}</Context.Provider>
```
`Context.Provider` 的value 是一个如下对象：
```javascript
{
  store,
  subscription
}
```