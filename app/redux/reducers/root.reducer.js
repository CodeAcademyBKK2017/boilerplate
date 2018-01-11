import notes from './notes.reducer';
import Router from '../../routes/index';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  Router.router.getStateForAction(action, state) || state
);

export default combineReducers({
  notes,
  nav
});