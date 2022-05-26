import React, { useReducer } from "react";
import { TodoContext } from "./TodoContext";

// Provider 的value 接收一个对象
/**
 * 
 * @param {*} param0 
 * function App() {
    const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
        return (
            <div className="section" data-title="11 hooks: useReducer">
            <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
                <A />
            </Context.Provider>
            </div>
        );
    }
     function mountReducer(reducer, initialArg, init) {
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
      var dispatch = queue.dispatch = dispatchAction.bind(null, // Flow doesn't know this is non-null, but we do.
      currentlyRenderingFiber$1, queue);
      return [hook.memoizedState, dispatch];
    }
 */
export const TodoProvider = ({ reducer, initialState, children }) => (
	<TodoContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</TodoContext.Provider>
);
