import { put, select, take, takeLatest } from 'redux-saga/effects';
import { getIncompleteVisibleTodos } from '../reducers/selectors';
import {
  toggleCompleteAsync,
  completeAllAsync,
  startLoading,
  stopLoading,
} from '../actions';
import * as actionTypes from './../actions/actionTypes';

function* completeAllTodos() {
  try {
    yield put(startLoading());
    const todos = yield select(getIncompleteVisibleTodos);
    if (todos.size === 0) {
      debugger;
      return yield put(
        completeAllAsync.failure({ message: 'No tasks to complete' }),
      );
    }
    //handle complete task same way as in case of completing of one task
    yield* runCompleteTodosTasks(todos);
    let completed = 0;
    //wait for finish of all tasks
    while (completed < todos.size) {
      //@TO-DO for now doesn't matter if the task if finished successfully or not
      yield take(
        actionTypes.COMPLETE_STATE.SUCCESS ||
          actionTypes.COMPLETE_STATE.FAILURE,
      );
      completed++;
    }
    //@TO-DO resolve state if all tasks are not finished successfully - undo etc.
    yield put(completeAllAsync.success({ count: completed }));
  } catch (e) {
    yield put(completeAllAsync.failure({ message: e.message }));
  } finally {
    stopLoading();
  }
}
/**
 * Calls action COMPLETE_TODO_TYPES.REQUEST for todos
 * @param {List} todos
 */
function* runCompleteTodosTasks(todos) {
  for (let i = 0; i < todos.size; i++) {
    let o = todos.get(i);
    yield put(toggleCompleteAsync.request(o));
  }
}
export function* watchCompleteAll() {
  yield takeLatest(actionTypes.COMPLETE_ALL.REQUEST, completeAllTodos);
}
