import { Map, Record } from 'immutable';
import * as ATypes from './../actions/actionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { updateItemInMap } from '../../immutableHelpers';

function initFromFetch(state, action) {
  return state.merge(
    action.payload.reduce((acc, el) => {
      return acc.set(el['id'], new TodoMeta());
    }, new Map({})),
  );
}

function addMetaItem(state, action) {
  if (!action.payload || !action.payload.id) return state;
  return state.set(action.payload.id, new TodoMeta({}));
}

function startLoading(state, action) {
  if (!action.payload || !action.payload.id) return state;
  return updateItemInMap(state, action.payload.id, { loading: true });
}

function stopLoading(state, action) {
  if (!action.payload || !action.payload.id) return state;
  return updateItemInMap(state, action.payload.id, { loading: false });
}

function deleteMetaItem(state, action) {
  if (!action.payload || !action.payload.id) return state;
  return state.delete(action.payload.id);
}

const todosMetaReducer = createReducer(new Map(), {
  [ATypes.FETCH_ALL.SUCCESS]: initFromFetch,
  [ATypes.FETCH_COMPLETED.SUCCESS]: initFromFetch,
  [ATypes.ADD.SUCCESS]: addMetaItem,
  [ATypes.DELETE.SUCCESS]: deleteMetaItem,
  [ATypes.START_LOADING]: startLoading,
  [ATypes.STOP_LOADING]: stopLoading,
});

const TodoMeta = Record({
  loading: false,
});

export default todosMetaReducer;
