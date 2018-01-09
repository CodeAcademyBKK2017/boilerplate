import {combineReducers} from 'redux';
import {filterNote} from '../../utils/transformerutil';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...previousState, action.payload];
    }
    case 'DELETE_NOTE': {
      const remainNote = filterNote(previousState, action.payload);
      return remainNote;
    }
    case 'POPULATE_NOTE': {
      return action.payload;
    }
    default:
      return previousState;
    }
  }
});