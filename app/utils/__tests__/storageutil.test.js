import storageutil from '../storageutil';
import {AsyncStorage} from 'react-native';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve({})),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('Storageutil', async () => {
  it('get item', () => {
    storageutil.getItem();
    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith('notes');
  });

  it('set item', () => {
    const newNote = {
      title: 'tiele',
      content: ' content'
    };
    storageutil.setItem(newNote);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('notes', JSON.stringify(newNote));
  });
});