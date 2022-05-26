import { connect } from 'react-redux';
import TodoNotification from '../components/TodoNotification';
import { getNotification } from '../reducers/selectors';
import { displayNotification } from '../actions';

const mapStateToProps = state => {
  return {
    notification: getNotification(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHide: () => {
      dispatch(displayNotification(false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoNotification);
