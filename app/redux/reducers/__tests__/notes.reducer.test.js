import Notes from '../notes.reducer';
import {POPULATE_NOTES} from '../../actions/index.actions';

describe('Notes Reducer Testing', () => {

  it('POPULATE_NOTES', () => {
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

  it('other', () => {
    const dataInput = {
      type: 'other'
    };
    const result = Notes([], dataInput);
    expect(result).toEqual([]);
  });
});
