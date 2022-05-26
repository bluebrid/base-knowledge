// import { combineReducers } from 'redux'
import { combineReducers } from '../redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  title: () => {
    return 'This is a title'
  }
})

export default rootReducer
