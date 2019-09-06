import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './1.newContext/App';
// import App from './2.ErrorBoundary/App'
// import App from './3.Lazy-loading/App'
// import App from './4.hooks/App'
// import App from './5.portals/App'
// import App from './6.refs/App'
// import App from './7.memo/App'
// import App from './8.lifecycle/App'
import App from './10.useCallback/App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
