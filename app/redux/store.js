import createSagaMiddleware from 'redux-saga';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import rootReducer from './reducers/root.reducer';
import {applyMiddleware, compose, createStore} from 'redux';
import {fork, put, takeEvery} from 'redux-saga/effects';

const logger = () => (next) => (action) => {
  // console.log('action is', action);
  next(action);
};

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield put({
    type: 'POPULATE_NOTE',
    payload: [{
      title: 'React Native',
      content: '- UI',
      key: 0,
      id: 1
    }]
  });
  // yield put({
  //   type: 'HIDE_LOADER'
  // });
}

function* notes () {
  yield takeEvery('FETCH_NOTES', fetchHandler);
}

function* sagas () {
  yield fork(notes);
}

export const initStore = () => {
  const store = createStore(rootReducer, {}, composedEnhancer);
  sagaMiddleware.run(sagas);
  return store;
};