import React from 'react';
import reducer from '../notes.reducer';
import TransformerUtil from '../../../utils/TransformerUtil';
import {ADD_NOTE, DELETE_NOTE, POPULATE_NOTES} from '../../actions/index.actions';

describe('notes.reducer', () => {
  it('ADD_NOTE', () => {
    const prevState = [];
    const action = {
      type: ADD_NOTE,
      payload: {
        id: 1,
        title: 'some title',
        content: 'some content'
      }
    };

    const result = reducer(prevState, action);

    expect(result).toEqual([{
      id: 1,
      title: 'some title',
      content: 'some content'
    }]);
  });

  it('DELETE_NOTE', () => {
    const prevState = [{
      id: 1,
      title: 'some title',
      content: 'some content'
    }];
    const action = {
      type: DELETE_NOTE,
      payload: 1
    };

    const result = reducer(prevState, action);

    const expected = TransformerUtil.removeNote(prevState, action.payload);
    expect(result).toEqual(expected);
  });

  it('POPULATE_NOTES', () => {
    const prevState = [];
    const action = {
      type: POPULATE_NOTES,
      payload: [{
        id: 1,
        title: 'some title',
        content: 'some content'
      }, {
        id: 2,
        title: 'some title',
        content: 'some content'
      }]
    };

    const result = reducer(prevState, action);
    
    expect(result).toEqual(action.payload);
  });

  it('default', () => {
    const prevState = undefined;
    const action = {
      type: ''
    };

    const result = reducer(prevState, action);
    
    expect(result).toEqual([]);
  });
});