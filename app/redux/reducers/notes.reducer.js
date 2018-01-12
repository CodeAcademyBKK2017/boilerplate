import Utility from '../../util/utility';
import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTE} from '../actions/index.action';

const noteReducer = (previousState = [], action) => {
  switch (action.type) {
  case ADD_NOTE:
    return [...previousState, action.payload];
  case DELETE_NOTE:
    return Utility.filterNotes(previousState, action.payload);
  case POPULATE_NOTE:
    return action.payload; 
  default:
    return previousState;
  }
};

export default noteReducer;