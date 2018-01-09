import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}), // reducer
  notes: (prevState = [
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
  ], action) => {
    switch (action.type) {
    case 'ADD_NOTE':
      return [...prevState, {
        title: 'title from reducer xx',
        content: 'content from reducer xx'
      }];
      // break;
    
    default:
      return prevState;
      // break;
    }
  }
});
