import utility from '../../util/utility';
import {ADDNOTE, DELETENOTE, POPULATENOTE} from '../actions/index.action';
import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case ADDNOTE:
      return [...previousState, action.payload];
    case DELETENOTE:
      return utility.filterNotes(previousState, action.payload);
    case POPULATENOTE:
      return action.payload; 
    default:
      return previousState;
    }
  }
});