import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}),
  notes: () => ([{title: 'title from redux', content: 'content from redux'}])
});