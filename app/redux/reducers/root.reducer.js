import loader from './loader.reducer';
import MyDrawerNavigator from '../../Routes/index';
import note from './note.reducer';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  MyDrawerNavigator.router.getStateForAction(action, state) || state
);

export default combineReducers({
  notes: note,
  nav,
  loader: loader
});