import rootReducer from './reducers/root.reducer';
import {applyMiddleware, compose, createStore} from 'redux';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const logger = () => (next) => (action) => {
  next(action);
};

const composedEnhancer = compose(applyMiddleware(logger), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);
