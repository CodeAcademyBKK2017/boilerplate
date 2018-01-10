import Notes from './notes.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}), // reducer
  notes: Notes
});
