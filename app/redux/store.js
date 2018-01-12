import createSagaMiddleware from 'redux-saga';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import rootReducer from './reducers/root.reducer';
import {applyMiddleware, compose, createStore} from 'redux';
import {call, fork, put, take, takeEvery} from 'redux-saga/effects';

const logger = () => (next) => (action) => {
  // console.log('action is', action);
  next(action);
};

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

function* everyFetchNote () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield put({
    type: 'POPULATE_NOTES',
    payload: []
  });
  yield put({
    type: 'HIDE_LOADER'
  });
  return console.log('everyFetchNote');
}

function* notes () {
  yield takeEvery('FETCH_NOTES', everyFetchNote);
  console.log('notes saga');
}

function* sagas () {
  yield fork(notes);
  console.log('index saga');
}

export const initStore = () => {
  const store = createStore(rootReducer, {}, composedEnhancer);
  sagaMiddleware.run(sagas);
  return store;
};