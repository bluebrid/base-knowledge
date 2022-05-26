import { OrderedMap, Record } from 'immutable';
import * as ATypes from './../actions/actionTypes';
import {
  createOrderedMap,
  addRecordToMap,
  updateItemInMap,
  deleteItemFromMap,
} from '../../immutableHelpers';
import { createReducer } from '@reduxjs/toolkit';

function fetchAllSuccess(state, action) {
  return state.mergeDeep(createOrderedMap(action.payload, 'id', Todo));
}

function addTodoSuccess(state, action) {
  return addRecordToMap(state, 'id', action.payload, Todo);
}

function completeStateSuccess(state, action) {
  return updateItemInMap(state, action.payload.id, action.payload);
}

function updateTodoSuccess(state, action) {
  return updateItemInMap(state, action.payload.id, action.payload);
}

function deleteTodoSuccess(state, action) {
  return deleteItemFromMap(state, action.payload.id);
}

const todoReducer = createReducer(new OrderedMap(), {
  [ATypes.FETCH_ALL.SUCCESS]: fetchAllSuccess,
  [ATypes.FETCH_COMPLETED.SUCCESS]: fetchAllSuccess,
  [ATypes.ADD.SUCCESS]: addTodoSuccess,
  [ATypes.COMPLETE_STATE.SUCCESS]: completeStateSuccess,
  [ATypes.UPDATE.SUCCESS]: updateTodoSuccess,
  [ATypes.DELETE.SUCCESS]: deleteTodoSuccess,
});

export const Todo = Record({
  id: '',
  text: '',
  completed: false,
  createdDate: null,
  completedDate: null,
});

export default todoReducer;
