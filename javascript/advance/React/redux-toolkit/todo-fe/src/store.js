import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './todos/reducers';
import { createLogger } from 'redux-logger';
import todoRootSaga from './todos/sagas';
import { Map } from 'immutable';

const initialState = new Map();

const configureStore = () => {
  const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [];
  const initSagaMiddleware = createSagaMiddleware();

  //use saga middleware
  middlewares.push(initSagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    //use logger middleware
    middlewares.push(createLogger());
  }

  return {
    ...createStore(
      reducers,
      initialState,
      storeEnhancers(applyMiddleware(...middlewares)),
    ),
    runSaga: initSagaMiddleware.run,
  };
};

const store = configureStore();
store.runSaga(todoRootSaga);

export default store;
