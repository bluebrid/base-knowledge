import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App1 from './1.newContext/App';
// import App from './2.ErrorBoundary/App'
import App3 from './3.Lazy-loading/App'
import App4 from './4.hooks/App'
import App5 from './5.portals/App'
import App6 from './6.refs/App'
import App7 from './7.memo/App'
import App8 from './8.lifecycle/App'
import App10 from './10.useCallback/App'
import App11 from './11.useReducer/App'
import App12 from './12.useMemo/App'
import App13 from './13.customHooks/App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<div>
  <App1 />
  <App3 />
  <App4 />
  <App5 />
  <App6 />
  <App7 />
  <App8 />
  <App10 />
  <App11 />
  <App12 />
  <App13 />
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
