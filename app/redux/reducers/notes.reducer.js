import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTE} from '../actions/index.actions';

const notes = (previousState = [], action) => {
  switch (action.type) {
  case ADD_NOTE: {
    return [...previousState, action.payload];
  }
  case DELETE_NOTE: {
    return action.payload;
  }
  case POPULATE_NOTE: {
    return action.payload;
  }
  default:
    return previousState;
  }
};

export default notes;
 