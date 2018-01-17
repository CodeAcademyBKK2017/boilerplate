import storageUtil from '../storage.util';
import {AsyncStorage} from 'react-native';

describe('storageUtil', () => {
  jest.mock('AsyncStorage', () => ({
    getItem: jest.fn(() => Promise.resolve('')),
    setItem: jest.fn(() => Promise.resolve())
  }));
  beforeEach(() => {
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
  });
  it('getItemsFromAsyncStorage: should be call fetch with url', () => {
    storageUtil.getItemsFromAsyncStorage('notes');
    expect(AsyncStorage.getItem).toHaveBeenCalled();
  });
  it('setItemsFromAsyncStorage: should be call fetch with url', () => {
    storageUtil.setItemsFromAsyncStorage('notes', []);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});