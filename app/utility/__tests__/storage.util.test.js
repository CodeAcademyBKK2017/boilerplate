import React from 'react';
import StorageUtil from '../storage.util';

import {AsyncStorage} from 'react-native';

jest.mock('AsyncStorage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('{}'))
}));

describe('AboutApp', () => {
  it('Check Function setItemFromAsyncStorage', () => { // example to test class methods
    StorageUtil.setItemFromAsyncStorage('state', {});
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('state', '{}');
  });

  it('Check Function getItemFromAsyncStorage', async () => {
    const expectedData = {};

    const result = await StorageUtil.getItemFromAsyncStorage('state');
    expect(result).toEqual(expectedData);
  });

});