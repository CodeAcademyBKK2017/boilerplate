import loader from '../loader.reducer';
import React from 'react';
import {HIDE_LOADER, SHOW_LOADER} from '../../actions/index.actions';

describe('Loader', () => {
  const previousState = {};
  it('check Show_Loader Reducer', () => {
    const action = {type: SHOW_LOADER};
    const result = loader(previousState, action);
    expect(result).toEqual({isLoaderVisible: true});
  });
  it('check Hide_Loader Reducer', () => {
    const action = {type: HIDE_LOADER};
    const result = loader(previousState, action);
    expect(result).toEqual({isLoaderVisible: false});
  });
  it('check Default Reducer', () => {
    const action = {};
    const result = loader(previousState, action);
    expect(result).toEqual({isLoaderVisible: false});
  });
  it('check PreviousState is undefined Reducer', () => {
    const action = {};
    const result = loader(undefined, action);
    expect(result).toEqual({isLoaderVisible: false});
  });
});