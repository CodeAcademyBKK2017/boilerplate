import {combineReducers} from 'redux';

export default combineReducers({
  notes: () => ([
    {
      title: 'hello',
      content: 'world'
    }
  ])
});