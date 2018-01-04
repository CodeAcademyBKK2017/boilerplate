import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

// mock function with default result
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('uuid', () => () => 'some uuid');

// constant
const notesKey = 'notes';

// test case
describe('App', () => {
  let appComp;
  let appInstance;
	
  beforeEach(() => {
    appComp = <App/>;
		
    const wrapper = shallow(appComp);
    appInstance = wrapper.instance();
    
    AsyncStorage.setItem.mockReset();
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

  it('onSaveButtonPress', () => {
    const title = 'my test title';
    const content = 'my test message';

    appInstance.onChangeTextTitle(title);
    appInstance.onChangeTextContent(content);
    appInstance.onSave();

    const expected = {
      textTitle: '',
      textContent: '',
      notes: [
        {
          key: 'some uuid',
          title,
          content
        }
      ]
    };
    expect(appInstance.state).toEqual(expected);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expected.notes));
  });

  it('onDeleteButtonPress', () => {
    const note00 = {
      key: 'some uuid',
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
    curryFunc();

    const expected = {
      textTitle: '',
      textContent: '',
      notes: []
    };
    expect(appInstance.state).toEqual(expected);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expected.notes));
  });

  it('onShowAboutUs', () => {
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    const appComp = <App {...props}/>;
    const wrapper = shallow(appComp);
    const appInstance = wrapper.instance();

    appInstance.onShowAboutUs();

    expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  it('componentDidMount with existed notes', () => {
    const notes = [
      {
        key: 'some uuid',
        title: 'my test title',
        content: 'my test message'
      }
    ];
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(notes)));

    appInstance.componentDidMount();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });

  it('componentDidMount with null', () => {
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null));
    
    appInstance.componentDidMount();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });
});
