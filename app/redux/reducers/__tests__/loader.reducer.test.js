import React from 'react';
import reducer from '../loader.reducer';
import {HIDE_LOADER, SHOW_LOADER} from '../../actions/index.actions';

describe('loader.reducer', () => {
  it('SHOW_LOADER', () => {
    const prevState = null;
    const action = {
      type: SHOW_LOADER
    };

    const result = reducer(prevState, action);

    expect(result).toEqual({
      isVisible: true
    });
  });

  it('HIDE_LOADER', () => {
    const prevState = null;
    const action = {
      type: HIDE_LOADER
    };

    const result = reducer(prevState, action);

    expect(result).toEqual({
      isVisible: false
    });
  });

  it('default', () => {
    const prevState = [];
    const action = {
      type: ''
    };

    const result = reducer(prevState, action);
    
    expect(result).toEqual({
      isVisible: false
    });
  });
});