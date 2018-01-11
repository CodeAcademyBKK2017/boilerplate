import React from 'react';
import StorageUtil from '../storage.util';
import {AsyncStorage} from 'react-native';

jest.mock('AsyncStorage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('{}'))
}));

describe('AboutApp', () => {
  it('Check Function setItem', () => { // example to test class methods
    StorageUtil.setItem('notes', {});
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('notes', '{}');
  });

  it('Check Function getItem', async () => {
    const expectedData = {};

    const result = await StorageUtil.getItem('notes');
    expect(result).toEqual(expectedData);
  });

});