const $root = document.querySelector("#root14");
const Context = React.createContext();

const service = {
  asyncFetch: async function asyncFetch(p) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(p);
      }, 1000 * 3);
    });
  }
};

const utils = {
  isPromise: function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "click_async":
    case "click_sync":
      return { ...state, value: action.payload };
    case "loading_start":
      return { ...state, loading: true };
    case "loading_end":
      return { ...state, loading: false };
    default:
      throw new Error();
  }
}

function wrapperDispatch(dispatch) {
  return function(action) {
    if (utils.isPromise(action.payload)) {
      dispatch({ type: "loading_start" });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: "loading_end" });
      });
    } else {
      dispatch(action);
    }
  };
}

const A = () => {
  const { dispatch, state } = React.useContext(Context);
  return (
    <div>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: "click_async",
            payload: service.asyncFetch(new Date().getTime())
          });
        }}
      >
        click async
      </button>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: "click_sync",
            payload: new Date().getTime()
          });
        }}
      >
        click sync
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
/**
 * 1. mountReducer：可以传递三个参数，或者两个参数：
 * 2. 如果传递两个参数， 则第二个参数就是初始化的state, 
 * 3. 如果传递三个参数， 则第三个参数是一个函数，初始化的状态是： init(initalArg)
 * 4. useReducer 跟useState 基本差不多， 不过useReducer 在queue 中保存了lastRenderedReducer为传递进入的reducer
 * 5. useReducer 返回了state 和一个 dispatchAction 函数
 * 6. 在这个例子中又用wrapperDispatch 对dispatchAction 进行了包裹，才通过Context.Provider 存入Context 中
 * 
 * function mountReducer(reducer, initialArg, init) {
        var hook = mountWorkInProgressHook();
        var initialState = void 0;
        if (init !== undefined) {
            initialState = init(initialArg);
        } else {
            initialState = initialArg;
        }
        hook.memoizedState = hook.baseState = initialState;
        var queue = hook.queue = {
            last: null,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
        };
        var dispatch = queue.dispatch = dispatchAction.bind(null,
        // Flow doesn't know this is non-null, but we do.
        currentlyRenderingFiber$1, queue);
        return [hook.memoizedState, dispatch];
    }
 * 7. 在子组件(A)中通过： const { dispatch, state } = React.useContext(Context); 
 *    获取根组件用Context.Provider 属性value 设置的的Context._currentValue: readContext (return isPrimaryRenderer ? context._currentValue : context._currentValue2;)
 * 8. 在子组件(A)中， 点击事件，通过dispatch 来触发reducer
 * 9. 当点击事件执行： dispatch({ type: "loading_start" });其实就相当于useState 中setValue 传入的新的state 为： { type: "loading_start" }
 * 10. 而dispatch 是在App 组件中生成的， 所以其对应的fiberNode.type 就是对应的App 组件， 也就是function dispatchAction(fiber, queue, action) { 第一个参数就是App
 * 11. 在dispatchAction 中会去获取var _lastRenderedReducer = queue.lastRenderedReducer;，然后执行：  var _eagerState = _lastRenderedReducer(currentState, action);， 获取最新的状态
 * 11. 然后在dispatchAction 中运行： scheduleWork(fiber, _expirationTime); 就会重新开始渲染App 组件， 子组件也会运行。
 * 12. 当再次运行App 中的React.useReducer 
 */
function App() {
  console.log(
    `%c[Dom](App) %c[=======================> ]`,
    `background: red; color: blue`,
    `background:"#222"}; color:"#bada55"}`
  );
  const [state, dispatch] = React.useReducer(reducer, {
    value: 0,
    loading: false
  });
  return (
    <div className="section demo-14" data-title="11 hooks: useReducer">
      <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
        <A />
      </Context.Provider>
    </div>
  );
}

ReactDOM.render(<App />, $root);
