import React from 'react';
import StorageUtil from '.././storage.util';
import {AsyncStorage} from 'react-native';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

const store = createStore(() => ({}));

describe('App', () => {
  let appComp;
  let appInstance;
  beforeEach(() => {
    appComp = <StorageUtil store={store}/>;
    const wrapper = shallow(appComp);
    appInstance = wrapper.find('App').shallow().instance();
  });
  xit('onSavePress success Async', async () => {
    const title = 'my test title';
    const content = 'my test content';
    appInstance.setState({title: title, content: content});
    await appInstance.onSavePress();
    const expectedNote = {
      'title': 'my test title',
      'content': 'my test content'
    };
    expect(expectedNote.setItem).toBeCalled();
  });

  xit('onSavePress failure Async', async () => {
    AsyncStorage.setItem.mockClear();
    StorageUtil.addNote.mockImplementation(() => Promise.reject('API failed'));
    await StorageUtil.onSavePress();
    expect(AsyncStorage.setItem).not.toBeCalled();
  });
});