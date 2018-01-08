import {combineReducers} from 'redux';

export default combineReducers({
  notes: () => ([
    {
      title: 'title00',  
      content: 'content00'
    },
    {
      title: 'title01',  
      content: 'content01'
    },
    {
      title: 'title02',  
      content: 'content02'
    }
  ])
});