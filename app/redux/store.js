import rootReducer from './reducers/root.reducer';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import {applyMiddleware, compose, createStore} from 'redux';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const NotEmpty = ({dispatch, getState}) => (next) => (action) => {
  console.log('action:::', action);
  if (action.type === 'ADD_NOTE') {
    if ((action.payload.title) && (action.payload.content)) {
      next(action);
    } 
  } else {
    next(action);
  }
};
const composedEnhancer = compose(applyMiddleware(NotEmpty), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);

// export default initStore;