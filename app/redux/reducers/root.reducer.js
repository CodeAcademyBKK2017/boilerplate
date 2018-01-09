import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'POPULATE_NOTES': {
      return action.payload;
    }
    case 'ADD_NOTES': {
      return [...previousState, action.payload];
    }
    case 'DELETE_NOTES': {
      const dataNOTES = [...previousState];
      dataNOTES.splice(action.payload, 1);
      return dataNOTES;
    }
    default: 
      return previousState;
    }
  }
});