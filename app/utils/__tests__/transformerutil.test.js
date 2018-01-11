import {filterNote} from '../transformerutil';

describe('transformerutil', () => {
  let array, id, result, removedArray;
  it('filterNote', () => {
    array = [{id: 1}, {id: 2}];
    id = 2;
    removedArray = [{id: 1}];
    result = filterNote(array, id);
    expect(result).toEqual(removedArray);
  });
});