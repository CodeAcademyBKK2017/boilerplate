import notesReducer from '../notes.reducer';

describe('notesReducer', () => {
  let previousState, action, result, expected;
  it('Case ADD_NOTE', () => {
    action = {type: 'ADD_NOTE', payload: 'xxxx'};
    expected = ['xxxx'];
    result =  notesReducer(previousState, action);
    expect(result).toEqual(expected);
  });
  it('Case POPULATE_NOTES', () => {
    action = {type: 'POPULATE_NOTES', payload: 'xxx'};
    expected = 'xxx';
    result =  notesReducer(previousState, action);
    expect(result).toEqual(expected);
  });
  it('Case DELETE_NOTE', () => {
    previousState = [{id: 2}];
    action = {type: 'DELETE_NOTE', payload: 2};
    expected = [];
    result =  notesReducer(previousState, action);
    expect(result).toEqual(expected);
  });
  it('Case default', () => {
    previousState = [{id: 2}];
    action = {type: '', payload: 2};
    expected = [{id: 2}];
    result =  notesReducer(previousState, action);
    expect(result).toEqual(expected);
  });
});