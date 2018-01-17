import Utility from '../utility';
import {AsyncStorage} from 'react-native';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('Utility', () => {
  it('filterNotes function is find array with expect id to delete item', () => {
    const data = [{
      text: 'text',
      id: 1
    }, {
      text: 'text',
      id: 2
    }];
    const expectTobe = [{
      text: 'text',
      id: 2
    }];
    const result = Utility.filterNotes(data, 1);
    expect(result).toEqual(expectTobe);
  });

  it('setItemToStroage function is store the item to AsyncStroage and getItemToStroage will be get data from AsyncStroage', async () => {
    const data = null;
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
    Utility.setItemToStroage('state', data);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('state', JSON.stringify(data));
    const result = await Utility.getItemToStroage('state');
    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith('state');
    expect(result).toEqual(data);
  });

  it('getItemToStroage function is get Item from stroage and not data it will be catch', async () => {
    const data = '';
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(''));
    Utility.setItemToStroage('state', data);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('state', JSON.stringify(data));
    await Utility.getItemToStroage('state');
    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith('state');
  });

  it('getStore function is get Item from state store and return', () => {
    const store = {notes: [{title: 'hi', content: 'hello', id: 1}]};
    const result = Utility.getStore(store);
    expect(result).toEqual([{title: 'hi', content: 'hello', id: 1}]);
  });
});