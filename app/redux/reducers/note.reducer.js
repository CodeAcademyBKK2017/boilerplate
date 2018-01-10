import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTES} from '../actions/index.actions';
import {removeNote} from '../../utils/transformer.util';

const notes = (state = [], action) => {
  switch (action.type) {
  case ADD_NOTE: {
    return [...state, action.payload];
  }
  case DELETE_NOTE: {
    return removeNote(state, action.payload.id);
  }
  case POPULATE_NOTES: {
    return [...action.payload];
  }
  default:
    return state; 
  }
};

export default notes;