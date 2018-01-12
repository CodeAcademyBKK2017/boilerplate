import notesUtil from '../../utils/transfromer.util';
import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTES} from '../actions/index.actions';

const notes = (previousstate = [], action) => {
  switch (action.type) {
  case ADD_NOTE:
    return [...previousstate, action.payload];
  case DELETE_NOTE: {
    return notesUtil.deleteNote(previousstate, action.payload.id);
  }
  case POPULATE_NOTES: { 
    return action.payload;
  }
  default:
    return previousstate;
  }
};
export default notes;