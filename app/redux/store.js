import rootReducer from './reducers/root.reducer';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import {applyMiddleware, compose, createStore/* , applyMiddleware*/} from 'redux';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}
const logger = ({dispatch, getState}) => (next) => (action) => {
  console.log('action is :::', action);
  if (action.type !== 'Navigation/NAVIGATE') {
    next(action);
  }
};
const composedEnhancer = compose(applyMiddleware(logger), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);
