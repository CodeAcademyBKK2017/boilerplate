import StorageUtil from '../storage.util';
import {AsyncStorage} from 'react-native';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve()),
  setItem: jest.fn(() => Promise.resolve())
}));

it('StorageUtil: Get item', () => {  
  StorageUtil.getItem('notes');
  expect(AsyncStorage.getItem).toBeCalledWith('notes');
});

it('StorageUtil: Set item', () => {  
  StorageUtil.setItem('notes', []);
  expect(AsyncStorage.setItem).toBeCalledWith('notes', JSON.stringify([]));
});