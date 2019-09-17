import React from "react";
// 相当于定义了一个全局的上下文
// 
/**
 * 1. 定义全局的上下文TodoContext
 * 2. export const useTodo = () => useContext(TodoContext); 定义一个引用全局上下文的方法`useTodo`
 * 3. const [state, dispatch] = useReducer(reducer, { value: 0, loading: false }); useReducer 会返回一个state和dispatch, 并且传递给Context.Provider
 *  `<Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>`
 * 4. 执行2的useTodo方法，也就是执行useContext(TodoContext)，返回的也是一个数组[state, dispatch]
 * 5. 利用dispatch 一个reducer
 *  dispatch({
                  type: 'ADD_TODO',
                  payload: { text }
                });
 */
export const TodoContext = React.createContext(undefined);