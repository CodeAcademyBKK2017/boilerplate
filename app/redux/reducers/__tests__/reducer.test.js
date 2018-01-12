import 'react-native';
import loader from '../loader.reducer';
import React from 'react';

describe('Loader:', () => {
  it('loader reducer is return true  when send SHOW_LOADER action', () => {
    const param = {type: 'SHOW_LOADER'};
    const result = loader(false, param);
    expect(result).toEqual(true);
  });

  it('loader reducer is return false when send HIDE_LOADER action', () => {
    const param = {type: 'HIDE_LOADER'};
    const result = loader(false, param);
    expect(result).toEqual(false);
  });

  it('loader reducer is return false when not send action', () => {
    const param = {type: 'ADD'};
    const result = loader(undefined, param);
    expect(result).toEqual(false);
  });
  
});
