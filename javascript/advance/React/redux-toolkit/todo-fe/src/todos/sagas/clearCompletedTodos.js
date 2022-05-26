import { put, select, take, takeLatest } from 'redux-saga/effects';
import { getCompletedTodos } from '../reducers/selectors';
import {
  deleteTodoAsync,
  deleteCompletedAsync,
  stopLoading,
  startLoading,
} from '../actions';
import * as actionTypes from './../actions/actionTypes';

function* clearCompletedTodos() {
  try {
    yield put(startLoading());
    const todos = yield select(getCompletedTodos);
    if (todos.size === 0) {
      return yield put(
        deleteCompletedAsync.success({
          message: 'There is not any completed task to delete',
        }),
      );
    }
    //handle complete task same way as in case of completing of one task
    yield* runDeleteCompletedTodos(todos);
    let completed = 0;
    //wait for finish of all tasks
    while (completed < todos.size) {
      //@TO-DO for now doesn't matter if the task if finished successfully or not
      yield take(actionTypes.DELETE.SUCCESS || actionTypes.DELETE.FAILURE);
      completed++;
    }
    //@TO-DO resolve state if all tasks are not finished successfully - undo etc.
    yield put(deleteCompletedAsync.success({ count: completed }));
  } catch (e) {
    yield put(deleteCompletedAsync.failure({ message: e.message }));
  } finally {
    yield put(stopLoading(null));
  }
}
/**
 * Calls action COMPLETE_TODO_TYPES.REQUEST for todos
 * @param {List} todos
 */
function* runDeleteCompletedTodos(todos) {
  for (let i = 0; i < todos.size; i++) {
    let id = todos.get(i).get('id');
    yield put(deleteTodoAsync.request({ id }));
  }
}

export function* watchClearCompleted() {
  yield takeLatest(actionTypes.DELETE_COMPLETED.REQUEST, clearCompletedTodos);
}
