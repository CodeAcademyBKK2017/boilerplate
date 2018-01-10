import transformerutil from '../../utility/transformerutil';
import {ADD_NOTE, DELETE_NOTE, GET_NOTE} from '../actions/index.actions';

const notes = (previousState = [], action) => {
  switch (action.type) {
  case ADD_NOTE: {
    return [...previousState, action.payload];
  }
  case DELETE_NOTE: {
    const filteredNotes = transformerutil.deleteNote(previousState, action.payload.id);
    return filteredNotes;
  }
  case GET_NOTE: {
    return action.payload;
  }
  default:
    return previousState;
  }
};

export default notes;