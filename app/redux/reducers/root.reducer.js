import {combineReducers} from 'redux';

export default combineReducers({
  notes: () => [
    {
      title: 'Title',
      content: 'Content',
      key: 0,
      id: 1
    }
  ]
});