import Tranformerutil from '../../utils/tranformerutil';
import {ADD_NOTE, DELE_NOTE, LOAD_SERVER} from './actions/index.actions';

const note = (perviousState = [], action) => {
  switch (action.type) {
  case ADD_NOTE : {
    return [...perviousState, action.payload];
  }
  case DELE_NOTE : {
    return Tranformerutil.removeNote(perviousState, action.payload.id);
  }
  case LOAD_SERVER : {
    return action.payload;
  }
  default:
    return perviousState;
  }
};

export default note;