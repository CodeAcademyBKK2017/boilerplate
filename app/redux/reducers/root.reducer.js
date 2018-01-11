import notes from './note.reducer';
import Router from '../../routes/main';
import {combineReducers} from 'redux';

const nav = (state, action) => (Router.router.getStateForAction(action, state) || state);

export default combineReducers({
  notes,
  nav
});