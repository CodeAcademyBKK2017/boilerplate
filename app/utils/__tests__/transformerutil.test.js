import {filterNote, getSelector} from '../transformerutil';

describe('transformerutil', () => {
  let array, id, result, removedArray;
  it('filterNote', () => {
    array = [{id: 1}, {id: 2}];
    id = 2;
    removedArray = [{id: 1}];
    result = filterNote(array, id);
    expect(result).toEqual(removedArray);
  });
  it('getSelector', () => {
    const store = {note: 1};
    const result = getSelector('note')(store);
    expect(result).toEqual(1);
  });
});