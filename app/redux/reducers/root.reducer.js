import nav from './nav.reducer';
import notesReducer from './notes.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  notes: notesReducer,
  nav
});