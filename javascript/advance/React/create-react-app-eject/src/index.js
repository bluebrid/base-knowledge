import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  // -------------------3、热更新操作
  // HotModuleReplacement.runtime.js 中定义了accept
  module.hot.accept(undefined, () => { // accept 第一个参数表示为undefined 表示这个本身的页面也会热更新
    // require("./index.js");
    //  renderWithHotReload(Router);
  });
}