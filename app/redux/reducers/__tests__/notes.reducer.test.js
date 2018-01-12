import Notes from '../notes.reducer';
import {ADD_NOTE, DELETE_NOTE, GET_NOTE} from '../../actions/index.actions';

describe('Notes Reducer Testing', () => {
  it('renders correctly ADD_NOTE', () => {
    const dataInput = {
      type: ADD_NOTE,
      payload: {
        id: '123',
        title: 'tt',
        content: 'cc'
      }
    };
    const result = Notes([], dataInput);
    expect(result).toEqual([{
      id: '123',
      title: 'tt',
      content: 'cc'
    }]);
  });
  xit('renders correctly DELETE_NOTE', () => {
    const dataInput = {
      type: DELETE_NOTE,
      payload: {
        id: '123',
        title: 'tt',
        content: 'cc'
      }
    };
    
  });
  it('renders correctly GET_NOTE', () => {
    const dataInput = {
      type: GET_NOTE,
      payload: {
        id: '123',
        title: 'tt',
        content: 'cc'
      }
    };
    const result = Notes([], dataInput);
    expect(result).toEqual({
      id: '123',
      title: 'tt',
      content: 'cc'
    });
  });
});
