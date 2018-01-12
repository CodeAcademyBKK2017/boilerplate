import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root.reducer';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import {applyMiddleware, compose, createStore/* , applyMiddleware*/} from 'redux';
// import {call, fork, put, take, takeEvery} from 'redux-saga/effects';
import {fork, put, takeEvery} from 'redux-saga/effects';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const logger = () => (next) => ((action) => {
  // console.log('action is :: ', action);
  // if (action.type !== 'Navigation/NAVIGATE') {
  //   next(action);
  // }
  next(action);
});

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

function* fetchHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  yield put({
    type: 'LOAD_SERVER',
    payload: [{
      title: 'title',
      content: 'sega',
      id: 1
    }]
  });
  yield put({
    type: 'HIDE_LOADER'
  });
  // console.log('SHOW_LOADER');
}

function* notes () {
  yield takeEvery('FATCH_NOTE', fetchHandler);
  // console.log('note saga');
}

function* sagas () {
  yield fork(notes);
  // console.log('index saga');
}

export const initStore = () => {
  const store = createStore(rootReducer, {}, composedEnhancer);
  sagaMiddleware.run(sagas);
  return store;
};

