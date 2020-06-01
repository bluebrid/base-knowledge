import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchAllAsync, startLoading, stopLoading } from '../actions';
import * as api from './../api';
import * as actionTypes from './../actions/actionTypes';

function* fetchTodos() {
  try {
    yield put(startLoading(null, 'Fetching all Todos...'));
    const data = yield call(api.fetchTodos);
    yield put(fetchAllAsync.success(data));
  } catch (e) {
    yield put(fetchAllAsync.failure({ message: e.message }));
  } finally {
    yield put(stopLoading(null, 'Todos has been fetched.'));
  }
}
export function* watchFetchTodos() {
  yield takeLatest(actionTypes.FETCH_ALL.REQUEST, fetchTodos);
}
