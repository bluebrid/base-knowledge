import * as ATypes from './actionTypes';

function action(type, payload = {}) {
  return {
    type,
    payload: payload,
  };
}

export const fetchAllAsync = {
  request: payload => action(ATypes.FETCH_ALL[ATypes.REQUEST], payload),
  success: payload => action(ATypes.FETCH_ALL[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.FETCH_ALL[ATypes.FAILURE], payload),
};

export const fetchCompletedAsync = {
  request: payload => action(ATypes.FETCH_COMPLETED[ATypes.REQUEST], payload),
  success: payload => action(ATypes.FETCH_COMPLETED[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.FETCH_COMPLETED[ATypes.FAILURE], payload),
};

export const deleteTodoAsync = {
  request: payload => action(ATypes.DELETE[ATypes.REQUEST], payload),
  success: payload => action(ATypes.DELETE[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.DELETE[ATypes.FAILURE], payload),
};

export const toggleCompleteAsync = {
  request: payload => action(ATypes.COMPLETE_STATE[ATypes.REQUEST], payload),
  success: payload => action(ATypes.COMPLETE_STATE[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.COMPLETE_STATE[ATypes.FAILURE], payload),
};

export const completeAllAsync = {
  request: payload => action(ATypes.COMPLETE_ALL[ATypes.REQUEST], payload),
  success: payload => action(ATypes.COMPLETE_ALL[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.COMPLETE_ALL[ATypes.FAILURE], payload),
};

export const addTodoAsync = {
  request: payload => action(ATypes.ADD[ATypes.REQUEST], payload),
  success: payload => action(ATypes.ADD[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.ADD[ATypes.FAILURE], payload),
};

export const updateTodoAsync = {
  request: payload => action(ATypes.UPDATE[ATypes.REQUEST], payload),
  success: payload => action(ATypes.UPDATE[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.UPDATE[ATypes.FAILURE], payload),
};

export const deleteCompletedAsync = {
  request: payload => action(ATypes.DELETE_COMPLETED[ATypes.REQUEST], payload),
  success: payload => action(ATypes.DELETE_COMPLETED[ATypes.SUCCESS], payload),
  failure: payload => action(ATypes.DELETE_COMPLETED[ATypes.FAILURE], payload),
};

export const setActiveFilter = filter => action(ATypes.SET_FILTER, filter);

export const toggleCompleted = (id, completed) => {
  return toggleCompleteAsync.request({ id, completed });
};

export const deleteTodo = id => {
  return deleteTodoAsync.request({ id });
};

export const completeAllVisible = () => {
  return completeAllAsync.request();
};

export const deleteAllCompletedTodos = () => {
  return deleteCompletedAsync.request();
};

export const updateTodo = ({ id, text }) => {
  return updateTodoAsync.request({ id, text });
};

export const startLoading = (id, message) =>
  action(ATypes.START_LOADING, { id, message });

export const stopLoading = (id, message) =>
  action(ATypes.STOP_LOADING, { id: id, message: message });

export const displayNotification = show =>
  action(ATypes.DISPLAY_NOTIFICATION, { show: show });
