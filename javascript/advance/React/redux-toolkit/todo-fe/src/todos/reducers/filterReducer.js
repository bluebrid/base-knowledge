import { SET_FILTER } from './../actions/actionTypes';
import { TODO_FILTER_TYPES } from '../constants';

const filterReducer = (
  state = TODO_FILTER_TYPES.SHOW_ALL,
  { type, payload },
) => {
  switch (type) {
    case SET_FILTER:      
      return payload;
    default:
      return state;
  }
};

export default filterReducer;
