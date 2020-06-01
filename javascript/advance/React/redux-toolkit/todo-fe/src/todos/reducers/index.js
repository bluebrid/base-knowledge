import { combineReducers } from 'redux-immutable';
import notification from './notificationReducer';
import todos from './todosReducer';
import filter from './filterReducer';
import todos_meta from './todosMetaReducer';

export default combineReducers({
  todos,
  filter,
  notification,
  todos_meta,
});
