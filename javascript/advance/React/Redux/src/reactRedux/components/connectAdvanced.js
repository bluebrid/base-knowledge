import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'
import { Component, createElement } from 'react'
import { polyfill } from 'react-lifecycles-compat'

import Subscription from '../utils/Subscription'
import { storeShape, subscriptionShape } from '../utils/PropTypes'

let hotReloadingVersion = 0
function noop() { }
function makeUpdater(sourceSelector, store) {
  return function updater(props, prevState) {
    try {
      // 将所有的mapStateToProps 和 mapDispatchToProps 封装到props中
      // 其中 mapDispatchToProps 会将所有的方法用dispatch 包裹如：
      /**
       * return function() {
          return dispatch(actionCreator.apply(this, arguments))
        }
        如addTODO = function {
          return dispatch(addTODO.apply(this, arguments))
        }
        其中dispatch 就是store.dispatch 
        dispatch 会通知所有的订阅者， 而connectAdvanced组件在componentDidMount事件中对store进行了订阅， 
        其this.runUpdater()会调用setState, 然后就会重新render 所有的组件
         componentDidMount() {
          if (!shouldHandleStateChanges) return
          this.subscription.trySubscribe()
          this.runUpdater()
        }
       */
      const nextProps = sourceSelector(store.getState(), props)
      if (nextProps !== prevState.props || prevState.error) { // 利用shouldComponentUpdate 来判断是否需要更新组件
        return {
          shouldComponentUpdate: true,
          props: nextProps,
          error: null,
        }
      }
      return {
        shouldComponentUpdate: false,
      }
    } catch (error) {
      return {
        shouldComponentUpdate: true,
        error,
      }
    }
  }
}

export default function connectAdvanced(
  selectorFactory,
  {
    getDisplayName = name => `ConnectAdvanced(${name})`,
    methodName = 'connectAdvanced',
    renderCountProp = undefined,
    shouldHandleStateChanges = true,
    storeKey = 'store',
    withRef = false,
    ...connectOptions
  } = {}
) {
  const subscriptionKey = storeKey + 'Subscription'
  const version = hotReloadingVersion++
  const contextTypes = {
    [storeKey]: storeShape,
    [subscriptionKey]: subscriptionShape,
  }
  const childContextTypes = {
    [subscriptionKey]: subscriptionShape,
  }

  function getDerivedStateFromProps(nextProps, prevState) {
    return prevState.updater(nextProps, prevState)
  }
  // 传入的组件，也就是需要进行加工处理的组建
  return function wrapWithConnect(WrappedComponent) {
    invariant(
      typeof WrappedComponent === 'function',
      `You must pass a component to the function returned by ` +
      `${methodName}. Instead received ${JSON.stringify(WrappedComponent)}`
    )

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'
    console.log('=======================>', wrappedComponentName)

    const displayName = getDisplayName(wrappedComponentName)

    const selectorFactoryOptions = {
      ...connectOptions,
      getDisplayName,
      methodName,
      renderCountProp,
      shouldHandleStateChanges,
      storeKey,
      withRef,
      displayName,
      wrappedComponentName,
      WrappedComponent
    }

    class Connect extends Component {
      constructor(props, context) {
        super(props, context)

        this.version = version
        this.renderCount = 0
        // 从context 中获取redux store.
        this.store = props[storeKey] || context[storeKey]
        this.propsMode = Boolean(props[storeKey])
        this.setWrappedInstance = this.setWrappedInstance.bind(this)

        invariant(this.store,
          `Could not find "${storeKey}" in either the context or props of ` +
          `"${displayName}". Either wrap the root component in a <Provider>, ` +
          `or explicitly pass "${storeKey}" as a prop to "${displayName}".`
        )
        // 一开始就设置了updater, updater 是如下function
        /**
         *   return function updater(props, prevState) {
              try {
                const nextProps = sourceSelector(store.getState(), props)
                if (nextProps !== prevState.props || prevState.error) {
                  return {
                    shouldComponentUpdate: true,
                    props: nextProps,
                    error: null,
                  }
                }
                return {
                  shouldComponentUpdate: false,
                }
              } catch (error) {
                return {
                  shouldComponentUpdate: true,
                  error,
                }
              }
            }
         */
        this.state = {
          updater: this.createUpdater()
        }
        this.initSubscription()
      }

      getChildContext() {
        const subscription = this.propsMode ? null : this.subscription
        return { [subscriptionKey]: subscription || this.context[subscriptionKey] }
      }

      componentDidMount() {
        if (!shouldHandleStateChanges) return
        this.subscription.trySubscribe()
        this.runUpdater()
      }

      shouldComponentUpdate(_, nextState) {
        return nextState.shouldComponentUpdate
      }

      componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe()
        this.subscription = null
        this.notifyNestedSubs = noop
        this.store = null
        this.isUnmounted = true
      }

      getWrappedInstance() {
        invariant(withRef,
          `To access the wrapped instance, you need to specify ` +
          `{ withRef: true } in the options argument of the ${methodName}() call.`
        )
        return this.wrappedInstance
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref
      }

      createUpdater() {
        // ======================================================================================> 
        //这里将dispatch方法传递到mapDispatchToProps.js 方法中。
        // selectorFactory.js => finalPropsSelectorFactory
        const sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions)
        // sourceSelector 返回的是一个function :
        /**
         *   return function pureFinalPropsSelector(nextState, nextOwnProps) {
              return hasRunAtLeastOnce
                ? handleSubsequentCalls(nextState, nextOwnProps)
                : handleFirstCall(nextState, nextOwnProps)
            }
         */
        return makeUpdater(sourceSelector, this.store)
      }

      runUpdater(callback = noop) {
        if (this.isUnmounted) {
          return
        }
        // 监听到Redux 中的status 变更, 然后调用setState
        this.setState(prevState => {
         return  prevState.updater(this.props, prevState)
        }, callback)

      }

      initSubscription() {
        if (!shouldHandleStateChanges) return

        const parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey]
        // Subscription 利用Redux 的store 的subscribe方法进行监听status 的变更。
        this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this))
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
      }

      onStateChange() {
        this.runUpdater(this.notifyNestedSubs)
      }

      isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed()
      }

      addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props
        const withExtras = { ...props }
        if (withRef) withExtras.ref = this.setWrappedInstance
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription
        return withExtras
      }

      render() {
        if (this.state.error) {
          throw this.state.error
        } else {
          return createElement(WrappedComponent, this.addExtraProps(this.state.props))
        }
      }
    }

    Connect.WrappedComponent = WrappedComponent
    Connect.displayName = displayName
    Connect.childContextTypes = childContextTypes
    Connect.contextTypes = contextTypes
    Connect.propTypes = contextTypes
    Connect.getDerivedStateFromProps = getDerivedStateFromProps

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentDidUpdate = function componentDidUpdate() {
        // We are hot reloading!
        if (this.version !== version) {
          this.version = version

          let oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get()
            this.subscription.tryUnsubscribe()
          }
          this.initSubscription()
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe()
            oldListeners.forEach(listener => this.subscription.listeners.subscribe(listener))
          }

          const updater = this.createUpdater()
          this.setState({ updater })
          this.runUpdater()
        }
      }
    }

    polyfill(Connect)

    return hoistStatics(Connect, WrappedComponent)
  }
}
