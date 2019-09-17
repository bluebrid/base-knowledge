import React from 'react';
import { TodoTextInput } from './TodoTextInput';
import { useTodo } from '../useTodo';
import Mock from 'mockjs';
import axios from 'axios';

Mock.mock(/save/, {
  'result': 'OK'
});

const Header = () => {
  /**
   * 1. 创建一个全局的context: export const TodoContext = React.createContext(undefined);
   * 2. 给context.Provider 提供一个value, 其值是useReducer
   * export const TodoProvider = ({ reducer, initialState, children }) => (
      <TodoContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </TodoContext.Provider>
    );
    3. useReducer 返回一个状态和一个dispatch的方法， dispatch 对应的就是dispatchAction.bind, 
    同时将reducer 和initialState 保存在queue的lastRenderedReducer和lastRenderedState， 会在执行dispatch 中用到这个值
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
    4. 在第2步， TodoContext.Provider 提供了一个值， 则全局的context:
    context.Provider._context._currentValue 中就保存了一个数组：1. 当前的状态state, 2 第3步中返回的dispatch(dispatchAction)函数
    5. 调用useContext 方法，传递的就是我们的全局的context:
    export const useTodo = () => useContext(TodoContext);
    最终返回的是：  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
    6. dispatch(dispatchActon)函数运行的主要逻辑是：
       1. 接收一个action
       2. 获取queue 中的lastRenderedReducer和lastRenderedState，执行lastRenderedReducer： var _eagerState = _lastRenderedReducer(currentState, action); // Stash， 并返回一个新的state
       3. 

   */
  const dispatch = useTodo()[1];

  return (
    <header className='header'>
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            axios.post('/save', {
              text: text
            })
              .then(res => {
                dispatch({
                  type: 'ADD_TODO',
                  payload: { text }
                });
              });
          }
        }}
        placeholder='What needs to be done?'
      />
    </header>
  );
};

export default Header;
