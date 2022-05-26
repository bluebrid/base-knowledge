import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchCompletedAsync, startLoading, stopLoading } from '../actions';
import * as api from '../api';
import * as actionTypes from '../actions/actionTypes';

function* fetchCompletedTodos() {
  try {
    yield put(startLoading(null, 'Fetching completed Todos...'));
    const data = yield call(api.fetchCompletedTodos);
    yield put(fetchCompletedAsync.success(data));
  } catch (e) {
    yield put(fetchCompletedAsync.failure({ message: e.message }));
  } finally {
    yield put(stopLoading(null, 'Todos has been fetched.'));
  }
}

export function* watchFetchCompletedTodos() {
  yield takeLatest(actionTypes.FETCH_COMPLETED.REQUEST, fetchCompletedTodos);
}
