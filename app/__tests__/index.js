import ApiNotes from '../api';
import ConnectedApp, {mapDisplatchToProps} from '../app';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import StorageUtil from '../utils/StorageUtil';
import {Alert} from 'react-native';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

// mock function with default result
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('uuid', () => () => 'some uuid');

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

jest.mock('../api');
jest.mock('../utils/StorageUtil');

const notesKey = 'notes';
const store = createStore(() => ({}));

describe('App', () => {
  let connectedAppComp;
  let appWrapper;
  let appInstance;
	
  beforeEach(() => {
    connectedAppComp = <ConnectedApp store={store}/>;
		
    const wrapper = shallow(connectedAppComp);
    appWrapper = wrapper.find('App').shallow();
    appInstance = appWrapper.instance();

    // -----
    
    ApiNotes.getNotes.mockClear();
    ApiNotes.deleteNote.mockClear();
    ApiNotes.addNote.mockClear();

    StorageUtil.getItem.mockClear();
    StorageUtil.setItem.mockClear();
  });

  it('renders correctly', () => {
    const snapshot = renderer.create(connectedAppComp).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
