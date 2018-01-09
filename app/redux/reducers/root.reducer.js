import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}), // reducer
  notes: (prevState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE':
      return [...prevState, action.payload];
      
    case 'DELETE_NOTE':
      return prevState.filter((note) => note.id !== action.payload.id);

    case 'POPULATE_NOTES':
      return action.payload;
    
    default:
      return prevState;
    }
  }
});
