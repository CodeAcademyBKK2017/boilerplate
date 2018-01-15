import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root.reducer';
import sagas from './sagas';
import {applyMiddleware, compose, createStore} from 'redux';

const logger = () => (next) => (action) => {
  next(action);
};

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

export const initStore = () => {
  const store = createStore(rootReducer, {}, composedEnhancer);
  sagaMiddleware.run(sagas);
  return store;
};