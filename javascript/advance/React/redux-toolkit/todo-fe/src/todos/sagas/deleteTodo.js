import { put, call, takeEvery } from 'redux-saga/effects';
import { deleteTodoAsync, stopLoading, startLoading } from '../actions';
import * as api from './../api';
import * as actionTypes from './../actions/actionTypes';

export function* deleteTodo({ payload }) {
  try {
    yield put(startLoading(payload.id));
    yield call(api.deleteTodo, payload.id);
    yield put(deleteTodoAsync.success(payload));
  } catch (e) {
    yield put(
      deleteTodoAsync.failure({
        payload: payload,
        message: e.message,
      }),
    );
  } finally {
    yield put(stopLoading(payload.id));
  }
}

export function* watchDeleteTodo() {
  yield takeEvery(actionTypes.DELETE.REQUEST, deleteTodo);
}
