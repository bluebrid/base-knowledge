import React, { useReducer } from 'react';
import Context from './store';
import A from './components/a';
import reducer from './store/reducer';
import wrapperDispatch from './store/action';
// import 'todomvc-app-css/index.css';

function App() {
  const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
  return (
    <div className="section" data-title="11 hooks: useReducer">
      <Context.Provider value={{ state, dispatch: wrapperDispatch(dispatch) }}>
        <A />
      </Context.Provider>
    </div>
  );
}
export default App;