import rootReducer from './reducers/root.reducer';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import {compose, createStore/* , applyMiddleware*/} from 'redux';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(/* applyMiddleware(someReduxMiddleware, someOtherReduxMiddleware),*/ ...enhancerList);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);

// module.exports = {
//   initStore
// };

// export default initStore;