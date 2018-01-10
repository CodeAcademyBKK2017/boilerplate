import note from './note.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  notes: note
});