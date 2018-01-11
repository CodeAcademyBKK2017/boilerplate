import rootReducer from './reducers/root.reducer';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import {applyMiddleware, compose, createStore} from 'redux';
import * as actions from './actions/index.actions';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const logger = () => (next) => (action) => {
  // console.log('action is', action);
  next(action);
};

const notAllowToSaveEmptyNote = () => (next) => (action) => {
  if (action.type === actions.ADD_NOTE) {
    if (!action.payload.title || !action.payload.content) {
      // console.log('please save valid note');
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};

const composedEnhancer = compose(applyMiddleware(logger, notAllowToSaveEmptyNote), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);
