import {combineReducers} from 'redux';

export default combineReducers({
  // notes: () => ([
  //   {
  //     title: 'title00',  
  //     content: 'content00'
  //   },
  //   {
  //     title: 'title01',  
  //     content: 'content01'
  //   },
  //   {
  //     title: 'title02',  
  //     content: 'content02'
  //   }
  // ])
  notes: (perviousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE' : {
      return [...perviousState, {
        title: action.payload.title,
        content: action.payload.content,
        id: action.payload.id}];
    }
    case 'DELE_NOTE' : {
      const afterDel = [...perviousState];
      const filteredNotes = afterDel.filter((note) => note.id !== action.payload.id);
      return filteredNotes;
    }
    case 'LOAD_SERVER' : {
      return action.payload;
    }
    default:
      return perviousState;
    }
  }
});