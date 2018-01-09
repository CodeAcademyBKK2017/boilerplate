import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...previousState, action.payload];
    }
    case 'DELETE_NOTE': {
      const deleteNote = previousState.filter((note) => note.id !== action.payload.id);
      return [...deleteNote];
    }
    case 'POPULATE_NOTE': {
      return action.payload;
    }
    default:
      return previousState;
    }
  }
});
