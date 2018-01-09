import Tranformerutil from '../../utils/tranformerutil';
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
      return Tranformerutil.removeNote(perviousState, action.payload.id);
    }
    case 'LOAD_SERVER' : {
      return action.payload;
    }
    default:
      return perviousState;
    }
  }
});