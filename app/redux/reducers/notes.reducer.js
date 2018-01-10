import transformerUtil from '../../utility/transformer.util';
import {ADD_NOTES, DELETE_NOTES, POPULATE_NOTES} from '../actions/index.action';

const notes = (previousState = [], action) => {
  switch (action.type) {
  case POPULATE_NOTES: {
    return action.payload;
  }
  case ADD_NOTES: {
    return [...previousState, action.payload];
  }
  case DELETE_NOTES: {
    return transformerUtil.deleteItem(previousState, action.payload);
  }
  default: 
    return previousState;
  }
};

export default notes;