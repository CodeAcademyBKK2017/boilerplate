// import test from './test.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}),
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...previousState, action.payload];
    }
    case 'DELETE_NOTE': {
      // filter: no mutation, push(): mutation, splice: mutation, slice: no mutation
      const filteredNotes = previousState.filter((note) => note.id !== action.payload.id);
      return filteredNotes;
    }
    case 'GET_NOTE': {
      return action.payload; // no mutation
    }
    default:
      return previousState;
    }
  }
});