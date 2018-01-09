import {combineReducers} from 'redux';

export default combineReducers({
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTES': {
      console.log('action::', action);
      return [...previousState, {
        title: action.payload.title, 
        content: action.payload.content,
        key: action.payload.key,
        id: action.payload.id
      }];
    }
    default: 
      return previousState;
    }
  }
});