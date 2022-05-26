function bindActionCreator(actionCreator, dispatch) {
  return function() {
    // console.log('111111111111111111111111')
    return dispatch(actionCreator.apply(this, arguments))
  }
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
export default function bindActionCreators(actionCreators, dispatch) {
  /**
   * TodoActions: 是如下一组方法：
   *  export const addTodo = text => ({ type: types.ADD_TODO, text })
      export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
      export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
      export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
      export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
      export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
      export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
   * const mapDispatchToProps = dispatch => ({
      actions: bindActionCreators(TodoActions, dispatch)
    })
   */
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      /**
       * function bindActionCreator(actionCreator, dispatch) {
            return function() {
              return dispatch(actionCreator.apply(this, arguments))
            }
          }
           function dispatch(action) dispatch 接收的是一个action 参数
           会将如下的action 加工成了一个dispatch 包装的函数
           export const addTodo = text => ({ type: types.ADD_TODO, text })
       */
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
