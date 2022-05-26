import React from 'react'
import { render } from 'react-dom'
import {applyMiddleware, createStore} from './redux/src/index'
import { Provider } from './react-redux/lib/index'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import {createLogger } from './redux-logger'
import customLogger from './custom-logger'
import DevTools from './containers/DevTools'
import configureStore from './store'
// const store = configureStore()
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
    <DevTools />
  </Provider>,
  document.getElementById('root')
)
