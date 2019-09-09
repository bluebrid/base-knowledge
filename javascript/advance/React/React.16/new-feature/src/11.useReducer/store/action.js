
import utils from '../utils';

function wrapperDispatch(dispatch) {
  return function (action) {
    if (utils.isPromise(action.payload)) {
      dispatch({ type: 'loading_start' });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: 'loading_end' });
      });
    } else {
      dispatch(action);
    }
  };
}
export default wrapperDispatch;