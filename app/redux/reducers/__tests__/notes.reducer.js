import 'react-native';
import notes from '../notes.reducer';
import React from 'react';
import Utility from '../../../util/utility';

describe('Notes:', () => {
  it('ADD_NOTE: Notes reducer is return All array with new array with payload', () => {
    const previousArray = [1, 2, 3];
    const expected = [1, 2, 3, 4];
    const param = {type: 'ADD_NOTE', payload: 4};
    const result = notes(previousArray, param);
    expect(result).toEqual(expected);
  });

  it('DELETE_NOTE: Notes reducer should be remove identify by id and return array ', () => {
    const previousArray = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const expected = [{id: 1}, {id: 2}, {id: 3}];
    const param = {type: 'DELETE_NOTE', payload: 4};
    jest.spyOn(Utility, 'filterNotes');
    const result = notes(previousArray, param);
    expect(Utility.filterNotes).toHaveBeenLastCalledWith(previousArray, 4);
    expect(result).toEqual(expected);
  });

  it('POPULATE_NOTE: Notes reducer should be return all array in payload  ', () => {
    const previousArray = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const expected = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const param = {type: 'POPULATE_NOTE', payload: previousArray};
    const result = notes(previousArray, param);
    expect(result).toEqual(expected);
  });

  it('DEFAULT: Notes reducer should be return all array of previousArray', () => {
    const previousArray = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const expected = [];
    const param = {type: '', payload: previousArray};
    const result = notes(undefined, param);
    expect(result).toEqual(expected);
  });
  
});
