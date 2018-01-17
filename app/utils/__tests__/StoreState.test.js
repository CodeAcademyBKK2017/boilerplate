import * as StoreState from '../StoreState';

describe('StoreState', () => {
  it('getNotesSelector', () => {
    const storeState = {
      notes: [{
        title: 'test title',
        content: 'test content'
      }]
    };

    const result = StoreState.getNotesSelector(storeState);

    expect(result).toEqual(storeState.notes);
  });
});
