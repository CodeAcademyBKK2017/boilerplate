import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...previousState, action.payload];
    }
    case 'DELETE_NOTE': {
      const delNote = [...previousState];
      const isDelete = (value) => value.id !== action.payload;
      const remainNote = delNote.filter(isDelete);
      return remainNote;
    }
    case 'POPULATE_NOTE': {
      return action.payload;
    }
    default:
      return previousState;
    }
  }
});