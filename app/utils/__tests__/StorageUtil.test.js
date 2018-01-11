import React from 'react';
import StorageUtil from '../StorageUtil';
import {AsyncStorage} from 'react-native';

// mock function with default result
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(() => Promise.resolve())
}));

// test case
describe('StorageUtil', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });
  
  // ----------

  it('getItem success', async () => {
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve('{ "title": "some title", "content": "some content" }'));

    const result = await StorageUtil.getItem('someKey');

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('someKey');
    expect(result).toEqual({
      title: 'some title',
      content: 'some content'
    });
  });

  it('getItem failure', async () => {
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve('some string that can not parse with JSON'));

    const result = await StorageUtil.getItem('someKey');

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('someKey');
    expect(result).toEqual(null);
  });

  it('setItem', async () => {
    await StorageUtil.setItem('someKey', {
      title: 'some title',
      content: 'some content'
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('someKey', '{"title":"some title","content":"some content"}');
  });
});
