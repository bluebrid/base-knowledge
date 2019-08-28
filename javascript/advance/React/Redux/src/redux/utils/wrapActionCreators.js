import { bindActionCreators } from '../../reducers'

export default function wrapActionCreators(actionCreators) {
  return dispatch => bindActionCreators(actionCreators, dispatch)
}
