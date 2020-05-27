import React from 'react'
import { render } from 'react-dom'
import {applyMiddleware, createStore} from './redux/src/index'
import { Provider } from './react-redux/lib/index'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import {createLogger } from './redux-logger'
import customLogger from './custom-logger'
const store = createStore(
  reducer,
  applyMiddleware(createLogger({
    // options
  }),
  customLogger)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
