import rootReducer from './reducers/root.reducer';
import {applyMiddleware, compose, createStore} from 'redux';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const navigationBlocker = ({dispatch, getState}) => (next) => (action) => {
  if (!action.type.includes('Navigation')) {
    next(action);
  }
};

const composedEnhancer = compose(applyMiddleware(navigationBlocker), ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);
