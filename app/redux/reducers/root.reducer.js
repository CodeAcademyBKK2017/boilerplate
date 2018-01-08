import {combineReducers} from 'redux';

export default combineReducers({
  notes: () => ([
    {
      title: 'Title',
      content: 'Content'
    }
  ])  
});