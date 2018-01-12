import loaderReducer from './loader.reducer';
import noteReducer from './notes.reducer';
import Router from '../../Routes/index';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  Router.router.getStateForAction(action, state) || state
);
 
export default combineReducers({
  notes: noteReducer,
  nav,
  loader: loaderReducer
});