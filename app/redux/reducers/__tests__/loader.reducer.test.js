import 'react-native';
import loader from '../loader.reducer';
import React from 'react';
import {HIDE_LOADER, SHOW_LOADER} from '../../actions/index.action';

describe('loader', () => {

  const previousState = {isVisible: false};
  const isVisibleTrue = {isVisible: true};
  const isVisibleFalse = {isVisible: false};
  const isVisibleDefault = {isVisible: false};

  it('loader : HIDE LOADER', () => {
    const action = {type: HIDE_LOADER};
    const result = loader(previousState, action);
    expect(result).toEqual(isVisibleFalse);
  });

  it('loader : SHOW LOADER', () => {
    const action = {type: SHOW_LOADER};
    const result = loader(previousState, action);
    expect(result).toEqual(isVisibleTrue);
  });
  
  it('loader : default', () => {
    const action = '';
    const result = loader(previousState, action);
    expect(result).toEqual(isVisibleDefault);
  });

  it('loader : PreviousState is undefined', () => {
    const action = {};
    const result = loader(undefined, action);
    expect(result).toEqual(isVisibleDefault);
  });
});