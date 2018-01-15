import Notes from '../notes.reducer';
import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTES} from '../../actions/index.actions';

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

  it('renders correctly DELETE_NOTE', () => {
    const dataInput = {
      type: DELETE_NOTE,
      payload: {
        id: '123',
        title: 'tt',
        content: 'cc'
      }
    };
    const previousState = [
      {
        id: '123',
        title: 'tt',
        content: 'cc'
      },
      {
        id: '1234',
        title: 'tt22',
        content: 'cc22'
      }
    ];
    const result = Notes(previousState, dataInput);
    expect(result).toEqual([{
      id: '1234',
      title: 'tt22',
      content: 'cc22'
    }]);
  });

  it('renders correctly POPULATE_NOTES', () => {
    const dataInput = {
      type: POPULATE_NOTES,
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

  it('renders correctly other', () => {
    const dataInput = {
      type: 'other'
    };
    const result = Notes([], dataInput);
    expect(result).toEqual([]);
  });
});
