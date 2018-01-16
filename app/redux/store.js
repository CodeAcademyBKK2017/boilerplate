import createSagaMiddleware from 'redux-saga';
import notes from './saga/index.saga';
import rootReducer from './reducers/root.reducer';
import {applyMiddleware, compose, createStore} from 'redux';
import {fork} from 'redux-saga/effects';

const logger = () => (next) => (action) => {
  next(action);
};

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

function* sagas () {
  yield fork(notes);
}

export const initStore = () => {
  const store = createStore(rootReducer, {}, composedEnhancer);
  sagaMiddleware.run(sagas);
  return store;
};