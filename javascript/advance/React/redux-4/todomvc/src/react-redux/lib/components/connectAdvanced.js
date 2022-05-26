import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'
import React, {
  useContext,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
  useReducer
} from 'react'
import { isValidElementType, isContextConsumer } from 'react-is'
import Subscription from '../utils/Subscription'

import { ReactReduxContext } from './Context'

// Define some constant arrays just to avoid re-creating these
const EMPTY_ARRAY = []
const NO_SUBSCRIPTION_ARRAY = [null, null]

const stringifyComponent = Comp => {
  try {
    return JSON.stringify(Comp)
  } catch (err) {
    return String(Comp)
  }
}

function storeStateUpdatesReducer(state, action) {
  const [, updateCount] = state
  return [action.payload, updateCount + 1]
}

const initStateUpdates = () => [null, 0]

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect

export default function connectAdvanced(
  /*
    selectorFactory is a func that is responsible for returning the selector function used to
    compute new props from state, props, and dispatch. For example:

      export default connectAdvanced((dispatch, options) => (state, props) => ({
        thing: state.things[props.thingId],
        saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
      }))(YourComponent)

    Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
    outside of their selector as an optimization. Options passed to connectAdvanced are passed to
    the selectorFactory, along with displayName and WrappedComponent, as the second argument.

    Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
    props. Do not use connectAdvanced directly without memoizing results between calls to your
    selector, otherwise the Connect component will re-render on every state or props change.
  */
  selectorFactory,
  // options object:
  {
    // the func used to compute this HOC's displayName from the wrapped component's displayName.
    // probably overridden by wrapper functions such as connect()
    getDisplayName = name => `ConnectAdvanced(${name})`,

    // shown in error messages
    // probably overridden by wrapper functions such as connect()
    methodName = 'connectAdvanced',

    // REMOVED: if defined, the name of the property passed to the wrapped element indicating the number of
    // calls to render. useful for watching in react devtools for unnecessary re-renders.
    renderCountProp = undefined,

    // determines whether this HOC subscribes to store changes
    shouldHandleStateChanges = true,

    // REMOVED: the key of props/context to get the store
    storeKey = 'store',

    // REMOVED: expose the wrapped component via refs
    withRef = false,

    // use React's forwardRef to expose a ref of the wrapped component
    forwardRef = false,

    // the context consumer to use
    context = ReactReduxContext,

    // additional options are passed through to the selectorFactory
    ...connectOptions
  } = {}
) {
  invariant(
    renderCountProp === undefined,
    `renderCountProp is removed. render counting is built into the latest React Dev Tools profiling extension`
  )

  invariant(
    !withRef,
    'withRef is removed. To access the wrapped instance, use a ref on the connected component'
  )

  const customStoreWarningMessage =
    'To use a custom Redux store for specific components, create a custom React context with ' +
    "React.createContext(), and pass the context object to React Redux's Provider and specific components" +
    ' like: <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' +
    'You may also pass a {context : MyContext} option to connect'

  invariant(
    storeKey === 'store',
    'storeKey has been removed and does not do anything. ' +
      customStoreWarningMessage
  )

  const Context = context
  // export default connect(null, { addTodo })(Header)
  // connetc(null, {addTodo})返回的是下面的wrapWithConnect 函数， 这个函数需要传递一个包裹的组件
  return function wrapWithConnect(WrappedComponent) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        isValidElementType(WrappedComponent),
        `You must pass a component to the function returned by ` +
          `${methodName}. Instead received ${stringifyComponent(
            WrappedComponent
          )}`
      )
    }

    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component'

    const displayName = getDisplayName(wrappedComponentName)

    const selectorFactoryOptions = {
      ...connectOptions,
      getDisplayName,
      methodName,
      renderCountProp,
      shouldHandleStateChanges,
      storeKey,
      displayName,
      wrappedComponentName,
      WrappedComponent
    }

    const { pure } = connectOptions

    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions)
    }

    // If we aren't running in "pure" mode, we don't want to memoize values.
    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
    // that just executes the given callback immediately.
    const usePureOnlyMemo = pure ? useMemo : callback => callback()

    function ConnectFunction(props) {
      const [propsContext, forwardedRef, wrapperProps] = useMemo(() => {
        // Distinguish between actual "data" props that were passed to the wrapper component,
        // and values needed to control behavior (forwarded refs, alternate context instances).
        // To maintain the wrapperProps object reference, memoize this destructuring.
        const { forwardedRef, ...wrapperProps } = props
        return [props.context, forwardedRef, wrapperProps]
      }, [props])

      const ContextToUse = useMemo(() => {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        // 返回的是: Context => import { ReactReduxContext } from './Context'
        // ReactReduxContext 的值是在Provider.js 中的Provider组件赋予初始化值的
        /**
         * 
         */
        return propsContext &&
          propsContext.Consumer &&
          isContextConsumer(<propsContext.Consumer />)
          ? propsContext
          : Context
      }, [propsContext, Context])

      // Retrieve the store and ancestor subscription via context, if available
      /**
       * 1. useContext(ContextToUse) 返回的是： ContextToUse._currentValue的值，其实一个对象：
       * {
       * store, subscription
       * }
       */
      const contextValue = useContext(ContextToUse) // => ContextToUse._currentValue

      // The store _must_ exist as either a prop or in context
      const didStoreComeFromProps = Boolean(props.store) // false
      const didStoreComeFromContext =
        Boolean(contextValue) && Boolean(contextValue.store)// true

      invariant(
        didStoreComeFromProps || didStoreComeFromContext,
        `Could not find "store" in the context of ` +
          `"${displayName}". Either wrap the root component in a <Provider>, ` +
          `or pass a custom React context provider to <Provider> and the corresponding ` +
          `React context consumer to ${displayName} in connect options.`
      )

      const store = props.store || contextValue.store

      const childPropsSelector = useMemo(() => {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return createChildSelector(store)
      }, [store])
      const [subscription, notifyNestedSubs] = useMemo(() => {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY

        // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        // 创建一个Subscription 对象
        // console.log('=======================>', wrappedComponentName,  didStoreComeFromProps ? null : contextValue.subscription)
        /**
         *  const contextValue = useMemo(() => {
          // 创建了一个根subscription
          const subscription = new Subscription(store)
          subscription.onStateChange = subscription.notifyNestedSubs
          // Context 的value 对象， 包括两个属性store 和subscription, 这里将Context 和 Redux 的store 绑定起来， 
          // 通过dispatch action 更新了store, 则contextValue 也变更了， 则会重新渲染组件
          return {
            store,
            subscription
          }
        }, [store])
         */
        /**
         * 1. contextValue 在Provider 设置
         * 2. 
         */
        if(!didStoreComeFromProps) {
          console.log('=======================>parentName:' + contextValue.subscription.name + ';Name:' + wrappedComponentName)
        }
        // 在下面的overriddenContextValue 中重新覆盖contextValue 的subscription
        const subscription = new Subscription(
          store,
          didStoreComeFromProps ? null : contextValue.subscription,
          wrappedComponentName
        )

        // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `subscription` will then be null. This can
        // probably be avoided if Subscription's listeners logic is changed to not call listeners
        // that have been unsubscribed in the  middle of the notification loop.
        const notifyNestedSubs = subscription.notifyNestedSubs.bind(
          subscription
        )

        return [subscription, notifyNestedSubs]
      }, [store, didStoreComeFromProps, contextValue])

      const overriddenContextValue = useMemo(() => {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue
        }

        // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done
        // 正常应该走这个分支， 因为store 来自context , 而不是props
        return {
          ...contextValue,
          subscription
        }
      }, [didStoreComeFromProps, contextValue, subscription])

      /**
       * useReducer 返回的是一个数组： 初始化状态和dispatch 函数
       *   var dispatch = queue.dispatch = dispatchAction.bind(null,
          // Flow doesn't know this is non-null, but we do.
          currentlyRenderingFiber$1, queue);
          return [hook.memoizedState, dispatch];
       */
      const [
        [previousStateUpdateResult],
        forceComponentUpdateDispatch
      ] = useReducer(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates)

      // Propagate any mapState/mapDispatch errors upwards
      if (previousStateUpdateResult && previousStateUpdateResult.error) {
        throw previousStateUpdateResult.error
      }

      // Set up refs to coordinate values between the subscription effect and the render logic
      const lastChildProps = useRef()
      const lastWrapperProps = useRef(wrapperProps)
      const childPropsFromStoreUpdate = useRef()
      const renderIsScheduled = useRef(false)
      // usePureOnlyMemo 就是useMemo, 只是在上面进行了重命名
      const actualChildProps = usePureOnlyMemo(() => {
        if (
          childPropsFromStoreUpdate.current &&
          wrapperProps === lastWrapperProps.current
        ) {
          return childPropsFromStoreUpdate.current
        }
        /**
         *  function handleFirstCall(firstState, firstOwnProps) {
              state = firstState
              ownProps = firstOwnProps
              stateProps = mapStateToProps(state, ownProps)
              dispatchProps = mapDispatchToProps(dispatch, ownProps)
              mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
              hasRunAtLeastOnce = true
              return mergedProps
            }
            根据mapStateToProps, mapDispatchToProps 获取真实的props
         */
        return childPropsSelector(store.getState(), wrapperProps)
      }, [store, previousStateUpdateResult, wrapperProps])
      //useIsomorphicLayoutEffect 就是：  useEffect
      useIsomorphicLayoutEffect(() => {
        // We want to capture the wrapper props and child props we used for later comparisons
        lastWrapperProps.current = wrapperProps
        lastChildProps.current = actualChildProps
        renderIsScheduled.current = false

        // If the render was from a store update, clear out that reference and cascade the subscriber update
        // const notifyNestedSubs = subscription.notifyNestedSubs.bind(
        //   subscription
        // )
        if (childPropsFromStoreUpdate.current) {
          childPropsFromStoreUpdate.current = null
          // 这里回去通知渲染嵌套的子组件
          notifyNestedSubs()
        }
      })

      // Our re-subscribe logic only runs when the store/subscription setup changes
      // useIsomorphicLayoutEffect 就是，useLayoutEffect， 是在渲染完成后，才去执行订阅
      useIsomorphicLayoutEffect(() => {
        // If we're not subscribed to the store, nothing to do here
        if (!shouldHandleStateChanges) return

        // Capture values for checking if and when this component unmounts
        let didUnsubscribe = false
        let lastThrownError = null

        // We'll run this callback every time a store subscription update propagates to this component
        const checkForUpdates = () => {
          // console.log('=======================>', wrappedComponentName)
          if (didUnsubscribe) {
            // Don't run stale listeners.
            // Redux doesn't guarantee unsubscriptions happen until next dispatch.
            return
          }
          // 获取最新的state
          const latestStoreState = store.getState()

          let newChildProps, error
          try {
            // Actually run the selector with the most recent store state and wrapper props
            // to determine what the child props should be
            // 根据对应的Connect 中传传递进来的mapStateToProps, 和最新的state 获取map 上的最新的props
            newChildProps = childPropsSelector(
              latestStoreState,
              lastWrapperProps.current
            )
          } catch (e) {
            error = e
            lastThrownError = e
          }

          if (!error) {
            lastThrownError = null
          }

          // If the child props haven't changed, nothing to do here - cascade the subscription update
          // 判断新的属性和老的属性是否相等
          if (newChildProps === lastChildProps.current) {
            if (!renderIsScheduled.current) {
              notifyNestedSubs()
            }
          } else {
            // Save references to the new child props.  Note that we track the "child props from store update"
            // as a ref instead of a useState/useReducer because we need a way to determine if that value has
            // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
            // forcing another re-render, which we don't want.
            lastChildProps.current = newChildProps
            childPropsFromStoreUpdate.current = newChildProps
            renderIsScheduled.current = true

            // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render
            /**
             * const [
                  [previousStateUpdateResult],
                  forceComponentUpdateDispatch
                ] = useReducer(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates)
             */
            
            /**
             * useReducer 返回的是一个数组： 初始化状态和dispatch 函数
             *   var dispatch = queue.dispatch = dispatchAction.bind(null,
                // Flow doesn't know this is non-null, but we do.
                currentlyRenderingFiber$1, queue);
                return [hook.memoizedState, dispatch];
            */
            // forceComponentUpdateDispatch 就是dispatch 函数， 传递的是一个state的参数
            // 利用reducer 返回的dispatch 函数去重新render 组件
            forceComponentUpdateDispatch({
              type: 'STORE_UPDATED',
              payload: {
                error
              }
            })
          }
        }

        // Actually subscribe to the nearest connected ancestor (or store)
        // onStateChange 是订阅的回调函数
        subscription.onStateChange = checkForUpdates
        // 订阅
        // console.log('=======================>订阅', wrappedComponentName)
        subscription.trySubscribe()

        // Pull data from the store after first render in case the store has
        // changed since we began.
        checkForUpdates()

        const unsubscribeWrapper = () => {
          didUnsubscribe = true
          subscription.tryUnsubscribe()
          subscription.onStateChange = null

          if (lastThrownError) {
            // It's possible that we caught an error due to a bad mapState function, but the
            // parent re-rendered without this component and we're about to unmount.
            // This shouldn't happen as long as we do top-down subscriptions correctly, but
            // if we ever do those wrong, this throw will surface the error in our tests.
            // In that case, throw the error from here so it doesn't get lost.
            throw lastThrownError
          }
        }

        return unsubscribeWrapper
      }, [store, subscription, childPropsSelector])

      // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.
      const renderedWrappedComponent = useMemo(
        // 加工传递进来的WrapedComponent组件， 给其设置通过connect 配置的属性
        () => <WrappedComponent {...actualChildProps} ref={forwardedRef} />,
        [forwardedRef, WrappedComponent, actualChildProps]
      )

      // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.
      const renderedChild = useMemo(() => {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          // 返回一个用ContextToUse.Provider 包裹的组件
          return (
            <ContextToUse.Provider value={overriddenContextValue}>
              {renderedWrappedComponent}
            </ContextToUse.Provider>
          )
        }

        return renderedWrappedComponent
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue])

      return renderedChild
      // ConnectFunction ===============================================================End
    }

    // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.
    // pure则用React.memo 包裹，类似PureComponent, 不过是一个函数组件
    // ConnectFunction 是上面定义的一个组件
    const Connect = pure ? React.memo(ConnectFunction) : ConnectFunction
    // 将需要封装的组件挂载在Connect 上面
    Connect.WrappedComponent = WrappedComponent
    Connect.displayName = displayName

    if (forwardRef) {
      const forwarded = React.forwardRef(function forwardConnectRef(
        props,
        ref
      ) {
        return <Connect {...props} forwardedRef={ref} />
      })

      forwarded.displayName = displayName
      forwarded.WrappedComponent = WrappedComponent
      return hoistStatics(forwarded, WrappedComponent)
    }
    // hoistNonReactStatics(targetComponent, sourceComponent);
    // 从子组件向父组件复制非React特定的静态。 类似 Object.assign，但在被重写的情况下，响应 static 关键字被忽略。
    // 这里有一个解决方法，就是hoist-non-react-statics组件，这个组件会自动把所有绑定在对象上的非React方法都绑定到新的对象上：
    const targetComponent =  hoistStatics(Connect, WrappedComponent)
    return targetComponent
  }
}
