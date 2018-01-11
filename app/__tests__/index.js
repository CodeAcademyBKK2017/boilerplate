import ApiNotes from '../api';
import ConnectedApp, {mapDisplatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
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

// constant
const notesKey = 'notes';
const store = createStore(() => ({}));

// test case
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
  
  // ----------

  it('renders correctly', () => {
    const snapshot = renderer.create(connectedAppComp).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('onChangeTextTitle', () => {
    const text = 'my test title';

    appInstance.onChangeTextTitle(text);

    expect(appInstance.state.textTitle).toBe(text);
  });

  it('onChangeTextContent', () => {
    const text = 'my test content';

    appInstance.onChangeTextContent(text);

    expect(appInstance.state.textContent).toBe(text);
  });

  it('onSaveButtonPress success', async () => {
    const title = 'my test title';
    const content = 'my test message';
    appInstance.setState({
      textTitle: title,
      textContent: content
    });
    const props = {
      addNote: jest.fn()
    };
    appWrapper.setProps(props);

    await appInstance.onSaveButtonPress();

    const expectedResponseNote = {
      id: 1,
      title,
      content
    };
    const expectedNotes = [expectedResponseNote];
    const expectedNote = {
      title,
      content
    };
    expect(ApiNotes.addNote).toHaveBeenCalledWith(expectedNote);
    expect(StorageUtil.setItem).toHaveBeenCalledWith(notesKey, expectedNotes);
    expect(appInstance.props.addNote).toHaveBeenCalledWith(expectedResponseNote);
  });

  it('onSaveButtonPress failure', async () => {
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    
    await appInstance.onSaveButtonPress();
    
    expect(StorageUtil.setItem).not.toBeCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      'Save Failed',
      'API failed',
      [{text: 'OK'}],
      {cancelable: false}
    );
  });

  it('onDeleteButtonPress success', async () => {
    const note00 = {
      id: 1,
      title: 'title 00',
      content: 'content 00'
    };
    const props = {
      notes: [note00],
      deleteNote: jest.fn()
    };
    appWrapper.setProps(props);
    
    const deleteHandler = appInstance.onDeleteButtonPress(note00);
    await deleteHandler();

    expect(ApiNotes.deleteNote).toHaveBeenCalledWith(note00.id);
    expect(StorageUtil.setItem).toHaveBeenCalledWith(notesKey, []);
    expect(appInstance.props.deleteNote).toHaveBeenCalledWith(note00.id);
  });

  it('onDeleteButtonPress failure', async () => {
    ApiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    const note00 = {
      id: 1,
      title: 'title 00',
      content: 'content 00'
    };
    
    const deleteHandler = appInstance.onDeleteButtonPress(note00);
    await deleteHandler();

    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Failed',
      'API failed',
      null,
      {cancelable: false}
    );
  });

  it('loadData success', async () => {
    const title = 'my test title';
    const content = 'my test message';
    const notes = [{
      id: 1,
      title,
      content
    }, {
      id: 2,
      title,
      content
    }];
    ApiNotes.getNotes.mockImplementation(() => Promise.resolve(notes));
    const props = {
      populateNote: jest.fn()
    };
    appWrapper.setProps(props);

    await appInstance.loadData();

    const expectedNotes = notes;
    expect(ApiNotes.getNotes).toBeCalled();
    expect(appInstance.props.populateNote).toHaveBeenCalledWith(expectedNotes);
  });

  it('loadData failure with data', async () => {
    ApiNotes.getNotes.mockImplementation(() => Promise.reject());
    const title = 'my test title';
    const content = 'my test message';
    const notes = [{
      id: 1,
      title,
      content
    }, {
      id: 2,
      title,
      content
    }];
    StorageUtil.getItem.mockImplementation(() => Promise.resolve(notes));
    const props = {
      populateNote: jest.fn()
    };
    appWrapper.setProps(props);

    await appInstance.loadData();

    expect(StorageUtil.getItem).toHaveBeenCalledWith(notesKey);
    expect(appInstance.props.populateNote).toHaveBeenCalledWith(notes);
  });

  it('loadData failure with null', async () => {
    ApiNotes.getNotes.mockImplementation(() => Promise.reject());
    StorageUtil.getItem.mockImplementation(() => Promise.resolve(null));
    const props = {
      populateNote: jest.fn()
    };
    appWrapper.setProps(props);

    await appInstance.loadData();

    expect(StorageUtil.getItem).toHaveBeenCalledWith(notesKey);
    expect(appInstance.props.populateNote).toHaveBeenCalledWith([]);
  });

  it('onAboutButtonPress with mock', () => {
    const dispatch = jest.fn();
    const props = mapDisplatchToProps(dispatch);
    
    props.navigateToAbout();

    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });
});
