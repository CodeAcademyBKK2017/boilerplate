import {POPULATE_NOTES} from '../actions/index.actions';

const notes = (previousState = [], action) => {
  switch (action.type) {
  case POPULATE_NOTES: {
    return action.payload;
  }
  default:
    return previousState;
  }
};

export default notes;