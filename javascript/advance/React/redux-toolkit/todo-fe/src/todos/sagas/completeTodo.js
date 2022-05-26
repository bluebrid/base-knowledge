import { put, call, takeEvery } from 'redux-saga/effects';
import { toggleCompleteAsync, startLoading, stopLoading } from '../actions';
import * as api from './../api';
import * as actionTypes from './../actions/actionTypes';

/**
 * Handles (complete|incomplete) states for one Todo
 */
function* completeTodo({ payload }) {
  try {
    const apiCall = !payload.completed ? api.completeTodo : api.incompleteTodo;
    yield put(startLoading(payload.id));
    const data = yield call(apiCall, payload.id);
    yield put(toggleCompleteAsync.success(data));
  } catch (e) {
    yield put(
      toggleCompleteAsync.failure({
        payload: e.message,
        message: e.message,
      }),
    );
  } finally {
    yield put(stopLoading(payload.id));
  }
}

export function* watchToggleCompleted() {
  yield takeEvery(actionTypes.COMPLETE_STATE.REQUEST, completeTodo);
}
