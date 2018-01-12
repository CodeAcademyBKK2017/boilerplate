import 'react-native';
import loader from '../loader.reducer';
import React from 'react';
import {HIDE_LOADER, SHOW_LOADER} from '../../actions/index.actions';

// Note: test renderer must be required after react-native.

describe('loader', () => {
  it('SHOW_LOADER', () => {
    const isvisble = false;
    const action = {type: SHOW_LOADER};
    const result = loader(isvisble, action);
    expect(result).toEqual(true);
  });
  it('HIDE_LOADER', () => {
    const isvisble = false;
    const action = {type: HIDE_LOADER};
    const result = loader(isvisble, action);
    expect(result).toEqual(false);
  });
  it('default', () => {
    const isvisble = false;
    const action = {};
    const result = loader(isvisble, action);
    expect(result).toEqual(isvisble);
  });
});
