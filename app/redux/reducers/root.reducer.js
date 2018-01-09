import utility from '../../util/utility';
import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE':
      return [...previousState, action.payload];
    case 'DELETE_NOTE':
      return utility.filterNotes(previousState, action.payload);
    case 'POPULATE_NOTE':
      return action.payload; 
    default:
      return previousState;
    }
  }
});