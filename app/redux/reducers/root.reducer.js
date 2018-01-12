import Router from '../../Routes/index';
import utility from '../../util/utility';
import {ADD_NOTE, DELETE_NOTE, HIDE_LOADER, POPULATE_NOTE, SHOW_LOADER} from '../actions/index.action';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  Router.router.getStateForAction(action, state) || state
);
 
export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case ADD_NOTE:
      return [...previousState, action.payload];
    case DELETE_NOTE:
      return utility.filterNotes(previousState, action.payload);
    case POPULATE_NOTE:
      return action.payload; 
    default:
      return previousState;
    }
  },
  nav,
  loader: (isVisible = false, action) => {
    switch (action.type) {
    case SHOW_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return isVisible;
    }
  }
});