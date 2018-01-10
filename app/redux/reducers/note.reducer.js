import {removeNote} from '../../utils/transformer.util';

const notes = (previousState = [], action) => {
  switch (action.type) {
  case 'ADD_NOTE': {
    return [...previousState, action.payload];
  }
  case 'DELETE_NOTE': {
    return removeNote(previousState, action.payload.id);
  }
  case 'POPULATE_NOTES': {
    return [...action.payload];
  }
  default:
    return previousState; 
  }
};

export default notes;