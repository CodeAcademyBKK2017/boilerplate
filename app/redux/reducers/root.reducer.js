import Loader from './loader.reducer';
import Notes from './notes.reducer';
import Router from '../../routes';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  Router.router.getStateForAction(action, state) || state
);
 
export default combineReducers({
  init: () => ({}), // reducer
  notes: Notes,
  nav,
  loader: Loader
});
