import { connect } from '../react-redux/lib/index'
import * as TodoActions from '../actions'
import { bindActionCreators } from '../redux/src/index'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'


const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)

