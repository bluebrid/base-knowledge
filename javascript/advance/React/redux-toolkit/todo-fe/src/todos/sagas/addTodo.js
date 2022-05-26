import { put, call, takeLatest } from 'redux-saga/effects';
import { addTodoAsync, startLoading, stopLoading } from '../actions';
import * as api from './../api';
import * as actionTypes from './../actions/actionTypes';

export function* addTodo({ payload }) {
  try {
    yield put(startLoading());
    const data = yield call(api.addTodo, payload);
    yield put(addTodoAsync.success(data));
  } catch (e) {
    yield put(addTodoAsync.failure({ message: e.message }));
  } finally {
    yield put(stopLoading());
  }
}
export function* watchAddTodo() {
  yield takeLatest(actionTypes.ADD.REQUEST, addTodo);
}
