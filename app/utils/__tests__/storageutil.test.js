import {AsyncStorage} from 'react-native';
import {getItemToStorage, setItemToStorage} from '../storageutil';

jest.mock('AsyncStorage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('{}'))
}));

describe('storageutil', () => {
  let storageName, data, result;
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
  });
  it('setItemToStorage', () => {
    storageName = 'x';
    data = '{x}';
    setItemToStorage(storageName, data);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(storageName, JSON.stringify(data));
  });
  it('getItemToStorage Success', async () => {
    storageName = 'y';
    data = {};
    result = await getItemToStorage(storageName);
    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith(storageName);
    expect(result).toEqual(data);
  });
  it('getItemToStorage Fail', async () => {
    AsyncStorage.getItem.mockImplementation(() => Promise.reject('API Fail'));
    result = await getItemToStorage(storageName);
    expect(result).toEqual(null);
  });
});