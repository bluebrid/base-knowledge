function createReqTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((action, type) => {
    action[type] = `${base}_${type}`;
    return action;
  }, {});
}
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const ADD = createReqTypes('todos/addTodo');
export const DELETE = createReqTypes('todos/deleteTodo');
export const UPDATE = createReqTypes('todos/updateTodo');
export const COMPLETE_STATE = createReqTypes('todos/setCompletedState');
export const COMPLETE_ALL = createReqTypes('todos/setVisibleCompleted');
export const DELETE_COMPLETED = createReqTypes('todos/deleteCompleted');
export const FETCH_COMPLETED = createReqTypes('todos/fetchCompleted');
export const FETCH_ALL = createReqTypes('todos/getAllTodos');
export const SET_FILTER = 'todos/setFilter';
export const START_LOADING = 'todos/notifyStartLoading';
export const STOP_LOADING = 'todos/notifyStopLoading';
export const DISPLAY_NOTIFICATION = 'todos/displayNotification';
