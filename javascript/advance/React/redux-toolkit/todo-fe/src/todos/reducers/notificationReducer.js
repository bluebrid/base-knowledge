import { Record } from 'immutable';
import * as ATypes from './../actions/actionTypes';
import { createReducer } from '@reduxjs/toolkit';

export const NOTIFICATION_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  PROGRESS: 'progress',
};

export const Notification = new Record({
  type: '',
  message: '',
  show: false,
});

function setNotification(state, type, message) {
  return state.merge({
    type: type,
    message: message,
    show: true,
  });
}

function setShow(state, payload) {
  return state.merge({
    show: payload.show,
  });
}

function setError(state, payload) {
  return setNotification(state, NOTIFICATION_TYPES.ERROR, payload.message);
}

function setProgress(state, payload) {
  return setNotification(state, NOTIFICATION_TYPES.PROGRESS, payload.message);
}

function setSuccess(state, payload) {
  return setNotification(state, NOTIFICATION_TYPES.SUCCESS, payload.message);
}

function completingAllStart(state, action) {
  return setProgress(state, { message: 'Completing all visible todos...' });
}

function fetchingStart(state, action) {
  return setProgress(state, { message: 'Fetching all todos...' });
}

function fetchingSuccess(state, action) {
  return setSuccess(state, { message: 'Successfully fetched all todos.' });
}

function deleteAllStart(state, action) {
  return setProgress(state, { message: 'Deleting all completed todos...' });
}

function updatedSuccess(state, action) {
  return setSuccess(state, { message: 'Successfully updated.' });
}

function addSuccess(state, action) {
  return setSuccess(state, { message: 'Successfully added.' });
}

function completingAllSuccess(state, action) {
  const { count } = action.payload;
  return setSuccess(state, {
    message: 'All (' + count + ') visible todos has been completed.',
  });
}

function deletingAllSuccess(state, action) {
  const { count } = action.payload;
  return setSuccess(state, {
    message: 'All (' + count + ') completed todos has been deleted',
  });
}

function completingAllFailure(state, action) {
  return setError(state, action.payload);
}

function showError(state, action) {
  return setError(state, action.payload);
}

export const notificationReducer = createReducer(
  new Notification({ show: false }),
  {
    [ATypes.ADD.SUCCESS]: addSuccess,
    [ATypes.DISPLAY_NOTIFICATION]: setShow,
    [ATypes.FETCH_ALL.REQUEST]: fetchingStart,
    [ATypes.COMPLETE_ALL.REQUEST]: completingAllStart,
    [ATypes.DELETE_COMPLETED.REQUEST]: deleteAllStart,
    [ATypes.UPDATE.SUCCESS]: updatedSuccess,
    [ATypes.FETCH_ALL.SUCCESS]: fetchingSuccess,
    [ATypes.COMPLETE_ALL.SUCCESS]: completingAllSuccess,
    [ATypes.DELETE_COMPLETED.SUCCESS]: deletingAllSuccess,
    [ATypes.DELETE.FAILURE]: showError,
    [ATypes.COMPLETE_STATE.FAILURE]: showError,
    [ATypes.FETCH_ALL.FAILURE]: showError,
    [ATypes.UPDATE.FAILURE]: showError,
    [ATypes.ADD.FAILURE]: showError,
    [ATypes.COMPLETE_ALL.FAILURE]: completingAllFailure,
  },
);

export default notificationReducer;
