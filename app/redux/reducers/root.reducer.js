// import test from './test.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({a: 1}),
  notes: () => ([{
    title: 'title from redux',
    content: 'content from redux',
    key: '1111'
  }])
});