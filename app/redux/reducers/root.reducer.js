import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}), // reducer
  notes: () => ([
    {
      title: 'title from reducer 00',
      content: 'content from reducer 00'
    },
    {
      title: 'title from reducer 01',
      content: 'content from reducer 01'
    },
    {
      title: 'title from reducer 02',
      content: 'content from reducer 02'
    }
  ])
});
