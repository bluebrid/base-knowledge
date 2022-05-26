import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactReduxContext } from './Context'
import Subscription from '../utils/Subscription'

/**
 * 
 * <Provider store={store}>
    <App />
  </Provider>,
 */
function Provider({ store, context, children }) {
  // useMemo 是缓存函数用的，如果传递的第二个参数不变，这个方法不会反复创建
  const contextValue = useMemo(() => {
    // 创建了一个根subscription
    const subscription = new Subscription(store, null, 'Provider')
    subscription.onStateChange = subscription.notifyNestedSubs
    // Context 的value 对象， 包括两个属性store 和subscription, 这里将Context 和 Redux 的store 绑定起来， 
    // 通过dispatch action 更新了store, 则contextValue 也变更了， 则会重新渲染组件
    return {
      store,
      subscription
    }
  }, [store])

  const previousState = useMemo(() => store.getState(), [store])

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState])
  // 因为在挂载Provider组件的时候， 没有传递context 属性 所以Context = ReactReduxContext, 也就是React-Redux 的全局Context
  const Context = context || ReactReduxContext

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

Provider.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }),
  context: PropTypes.object,
  children: PropTypes.any
}

export default Provider
