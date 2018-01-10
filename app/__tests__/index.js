import ApiNotes from '../api';
import ConnectedApp from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {createStore} from 'redux';
// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';

const store = createStore(() => ({}));
// mock function with default result
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('uuid', () => () => 'some uuid');

jest.mock('../api');

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

// constant
const notesKey = 'notes';

// test case
describe('App', () => {
  let appComp;
  let appInstance;
	
  beforeEach(() => {
    appComp =  <ConnectedApp store={store}/>;
		
    const wrapper = shallow(appComp);

    appInstance = wrapper.find('App').shallow().instance();
    
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    
    ApiNotes.getNotes.mockClear();
    ApiNotes.deleteNote.mockClear();
    ApiNotes.addNote.mockClear();
  });
  
  // ----------

  it('renders correctly', () => {
    const snapshot = renderer.create(appComp).toJSON();
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
      textContent: content,
      notes: []
    });

    await appInstance.onSaveButtonPress();

    const expectedState = {
      textTitle: '',
      textContent: '',
      notes: [{
        id: 1,
        title,
        content
      }]
    };
    const expectedNote = {
      title,
      content
    };
    expect(ApiNotes.addNote).toHaveBeenCalledWith(expectedNote);
    // expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expectedState.notes));
    // expect(appInstance.state).toEqual(expectedState);
  });

  xit('onSaveButtonPress failure', async () => {
    const title = 'my test title';
    const content = 'my test message';
    appInstance.setState({
      textTitle: title,
      textContent: content,
      notes: []
    });

    await appInstance.onSaveButtonPress();

    const expectedState = {
      textTitle: '',
      textContent: '',
      notes: [{
        id: 1,
        title,
        content
      }]
    };
    const expectedNote = {
      title,
      content
    };
    expect(ApiNotes.addNote).notHaveBeenCalledWith(expectedNote);
    expect(AsyncStorage.setItem).notHaveBeenCalledWith(notesKey, JSON.stringify(expectedState.notes));
    expect(appInstance.state).notEqual(expectedState);
  });

  it('onDeleteButtonPress success', async () => {
    const note00 = {
      id: 1,
      title: 'title 00',
      content: 'content 00'
    };
    const initialState = {
      textTitle: '',
      textContent: '',
      notes: [note00]
    };
    appInstance.setState(initialState);
    
    const curryFunc = appInstance.onDeleteButtonPress(note00);
    await curryFunc();

    const expected = {
      textTitle: '',
      textContent: '',
      notes: []
    };
    expect(ApiNotes.deleteNote).toHaveBeenCalledWith(note00.id);
    // expect(appInstance.state).toEqual(expected);
  });

  xit('onDeleteButtonPress failure', async () => {
    ApiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    const note00 = {
      id: 1,
      title: 'title 00',
      content: 'content 00'
    };
    
    const curryFunc = appInstance.onDeleteButtonPress(note00);
    await curryFunc();

    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Failed',
      'API failed',
      null,
      {cancelable: false}
    );
  });

  it('loadData with existed notes', async () => {
    ApiNotes.getNotes.mockImplementation(() => Promise.resolve([{
      id: 1,
      title: 'my test title',
      content: 'my test message'
    }, {
      id: 2,
      title: 'my test title',
      content: 'my test message'
    }]));

    const title = 'my test title';
    const content = 'my test message';
    const expected = {
      textTitle: '',
      textContent: '',
      notes: [{
        id: 1,
        title,
        content
      }, {
        id: 2,
        title,
        content
      }]
    };

    await appInstance.loadData();

    expect(ApiNotes.getNotes).toBeCalled();
    // expect(appInstance.state).toEqual(expected);
  });

  xit('loadData with empty', async () => {
    ApiNotes.getNotes.mockImplementation(() => Promise.resolve([]));

    await appInstance.loadData();

    expect(ApiNotes.getNotes).toBeCalled();
    expect(appInstance.state.notes).toEqual([]);
  });

  it('onAboutButtonPress with mock', () => {
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    const appComp =  <ConnectedApp store={store} {...props}/>;
		
    const wrapper = shallow(appComp);

    appInstance = wrapper.find('App').shallow().instance();

    appInstance.onAboutButtonPress();

    expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  xit('onAboutButtonPress with spy', () => {
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    const appComp = <ConnectedApp {...props}/>;
    const wrapper = shallow(appComp);
    const appInstance = wrapper.instance();
    const spyFunc = jest.spyOn(props.navigation, 'navigate');

    appInstance.onAboutButtonPress();
    
    expect(spyFunc).toHaveBeenCalledWith('About');
  });
});
