import loader from './loader.reducer';
import notes from './notes.reducer';
import Router from '../../routes';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  Router.router.getStateForAction(action, state) || state
);

export default combineReducers({
  nav,
  notes,
  loader
}); 