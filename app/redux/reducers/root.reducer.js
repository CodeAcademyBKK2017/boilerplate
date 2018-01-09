import TransformerUtil from '../../utils/TransformerUtil';
import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}), // reducer
  notes: (prevState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...prevState, action.payload];
    }
      
    case 'DELETE_NOTE': {
      return TransformerUtil.removeNote(prevState, action.payload.id);
    }

    case 'POPULATE_NOTES': {
      return action.payload;
    }
    
    default: {
      return prevState;
    }
    }
  }
});
