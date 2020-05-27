import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes'
import { SHOW_ALL } from '../constants/TodoFilters'

/**
    export const SHOW_ALL = 'show_all'
    export const SHOW_COMPLETED = 'show_completed'
    export const SHOW_ACTIVE = 'show_active'

 */
// 这里的state 是每个reducer 对应的状态，而不是整个state
const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter