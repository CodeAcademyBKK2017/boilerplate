import notesUtil from '../../utils/transfromer.util';
import Router from '../../routes/index';
import {combineReducers} from 'redux';

const nav = (state, action) => (
  Router.router.getStateForAction(action, state) || state
);

export default combineReducers({
  init: () => ({}), // reducer
  notes: (previousstate = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE':
      return [...previousstate, action.payload];
    case 'DELETE_NOTE': {
      return notesUtil.deleteNote(previousstate, action.payload.id);
    }
    case 'POPULATE_NOTES': { 
      return action.payload;
    }
    default:
      return previousstate;
    }
  },
  nav
});
