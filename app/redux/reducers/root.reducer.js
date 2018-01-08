// import test from './test.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}),
  notes: () => ([
    {
      id: '1',
      title: 'title from state',
      content: 'content from state'
    }
  ])
});