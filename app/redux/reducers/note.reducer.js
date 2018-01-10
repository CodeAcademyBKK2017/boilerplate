import Tranformerutil from '../../utils/tranformerutil';

const note = (perviousState = [], action) => {
  switch (action.type) {
  case 'ADD_NOTE' : {
    return [...perviousState, action.payload];
  }
  case 'DELE_NOTE' : {
    return Tranformerutil.removeNote(perviousState, action.payload.id);
  }
  case 'LOAD_SERVER' : {
    return action.payload;
  }
  default:
    return perviousState;
  }
};

export default note;