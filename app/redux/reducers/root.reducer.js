import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}), // reducer
  notes: (previousstate = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE':
      return [...previousstate, action.payload];
    case 'DELETE_NOTE': {
      const otherNote = previousstate.filter((note) => note.id !== action.payload.id);
      return [...otherNote];
    }
    case 'POPULATE_NOTES': { 
      return action.payload;
    }
    default:
      return previousstate;
    }
  }
  // notes: () => ([
  //   {
  //     title: 'title from reducer 00',
  //     content: 'content from reducer 00'
  //   },
  //   {
  //     title: 'title from reducer 01',
  //     content: 'content from reducer 01'
  //   },
  //   {
  //     title: 'title from reducer 02',
  //     content: 'content from reducer 02'
  //   }
  // ])
});
