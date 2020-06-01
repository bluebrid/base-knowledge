import { createSelector } from '@reduxjs/toolkit';
import { List } from 'immutable';
import { TODO_FILTER_TYPES } from '../constants';

export const getAllTodos = state => {
  return state.get('todos')
};
export const getFilter = state => state.get('filter');
export const getTodo = (state, id) => getAllTodos(state).get(id);
export const getIds = state => getAllTodos(state).keySeq();

export const getTodosMeta = state => state.get('todos_meta');
export const getTodoMeta = (state, id) => getTodosMeta(state).get(id);

const createGetTodos = createSelector(getIds, ids =>
  createSelector(
    ids.map(id => state => getTodo(state, id)).toArray(),
    (...ids) => List(ids),
  ),
);

export const getTodos = state => createGetTodos(state)(state);

export const getVisibleTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    let res;
    switch (filter) {
      case TODO_FILTER_TYPES.SHOW_ACTIVE:
        res = todos.filter(todo => !todo.get('completed'));
        break;
      case TODO_FILTER_TYPES.SHOW_COMPLETED:
        res = todos.filter(todo => todo.get('completed'));
        break;
      default:
        res = todos;
    }
    return res;
  },
);

export const getIncompleteVisibleTodos = createSelector(
  getVisibleTodos,
  todos => {
    return todos.filter(todo => !todo.get('completed'));
  },
);

export const getCompletedTodos = createSelector(getTodos, todos => {
  return todos.filter(todo => todo.get('completed'));
});

export const countCompletedTodos = createSelector(getCompletedTodos, todos => {
  return todos.size || 0;
});

export const getVisbleIncompleteCount = createSelector(
  getIncompleteVisibleTodos,
  todos => todos.size,
);

export const getNotification = state => state.get('notification');
