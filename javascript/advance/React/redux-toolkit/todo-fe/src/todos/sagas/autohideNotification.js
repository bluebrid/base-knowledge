import { put, takeLatest, delay, select } from 'redux-saga/effects';
import { displayNotification } from '../actions';
import { getNotification } from '../reducers/selectors';

function* autohideNotification() {
  const notification = yield select(getNotification);
  if (notification.get('show')) {
    yield delay(3000);
    yield put(displayNotification(false));
  }
}

export function* watchShowNotification() {
  yield takeLatest('*', autohideNotification);
}
