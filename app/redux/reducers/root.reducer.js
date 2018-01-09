import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...previousState, action.payload];
    }
    case 'DELETE_NOTE': {
      return previousState.filter((note) => note.id !== action.payload.id);
    }
    case 'POPULATE_NOTES': {
      return [...action.payload];
    }
    default:
      return previousState; 
    }
  }
});