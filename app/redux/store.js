import rootReducer from './reducers/root.reducer';
import {compose, createStore} from 'redux';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);
