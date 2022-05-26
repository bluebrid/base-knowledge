import { put, call, takeEvery } from 'redux-saga/effects';
import { updateTodoAsync, stopLoading, startLoading } from '../actions';
import * as api from './../api';
import * as actionTypes from './../actions/actionTypes';

function* updateTodo({ payload }) {
  try {
    yield put(startLoading(payload.id));
    const data = yield call(api.updateTodo, payload);
    yield put(updateTodoAsync.success(data));
  } catch (e) {
    yield put(
      updateTodoAsync.failure({
        payload: payload,
        message: e.message,
      }),
    );
  } finally {
    yield put(stopLoading(payload.id));
  }
}
export function* watchUpdateTodo() {
  yield takeEvery(actionTypes.UPDATE.REQUEST, updateTodo);
}
