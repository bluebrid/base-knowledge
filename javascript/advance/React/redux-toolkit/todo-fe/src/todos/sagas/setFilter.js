import { put, takeLatest } from 'redux-saga/effects';
import { fetchAllAsync, fetchCompletedAsync } from '../actions';

import * as actionTypes from '../actions/actionTypes';
import { TODO_FILTER_TYPES } from './../constants';

function* setFilter({ payload }) {
  switch (payload) {
    case TODO_FILTER_TYPES.SHOW_ALL:
      yield put(fetchAllAsync.request());
      break;
    case TODO_FILTER_TYPES.SHOW_COMPLETED:
      yield put(fetchCompletedAsync.request());
      break;
    default:
  }
}

export function* watchSetFilter() {
  yield takeLatest(actionTypes.SET_FILTER, setFilter);
}
