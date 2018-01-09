import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE':
      return [...previousState, action.payload];
    case 'DELETE_NOTE':
      return previousState.filter((item) => item.id !== action.payload);
    case 'POPULATE_NOTE':
      return action.payload; 
    default:
      return previousState;
    }
  }
});