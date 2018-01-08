import ApiNotes from '../api';
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

jest.mock('../api');

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
    
    AsyncStorage.setItem.mockClear();

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

  xit('onSaveButtonPress', () => {
    const title = 'my test title';
    const content = 'my test message';

    appInstance.onChangeTextTitle(title);
    appInstance.onChangeTextContent(content);
    appInstance.onSaveButtonPress();

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
    expect(appInstance.addNote).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expected.notes));
  });

  xit('onDeleteButtonPress', () => {
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

  xit('componentDidMount with existed notes', async () => {
    const notes = [
      {
        key: 'some uuid',
        title: 'my test title',
        content: 'my test message'
      }
    ];
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(notes)));

    await appInstance.componentDidMount();
    expect(appInstance.state.notes).toEqual(notes);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });

  xit('componentDidMount with null', () => {
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null));
    
    appInstance.componentDidMount();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });

  it('onAboutButtonPress with mock', () => {
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    const appComp = <App {...props}/>;
    const wrapper = shallow(appComp);
    const appInstance = wrapper.instance();

    appInstance.onAboutButtonPress();

    expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  it('onAboutButtonPress with spy', () => {
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    const appComp = <App {...props}/>;
    const wrapper = shallow(appComp);
    const appInstance = wrapper.instance();
    const spyFunc = jest.spyOn(props.navigation, 'navigate');

    appInstance.onAboutButtonPress();
    
    expect(spyFunc).toHaveBeenCalledWith('About');
  });

  /* ----------------------------------------------------------- */
  it('onSaveButtonPress success', async () => {
    const title = 'my test title';
    const content = 'my test message';
    appInstance.setState({textTitle: title, textContent: content, notes: []});

    await appInstance.onSaveButtonPress();
    const expected = {
      textTitle: '',
      textContent: '',
      notes: [{
        key: '123',
        id: '123',
        title: 'some title',
        content: 'some content'
      }, {
        key: 'some uuid',
        title,
        content
      }]
    };

    const expectedNote = {
      'content': 'my test message',
      'key': 'some uuid',
      'title': 'my test title'
    };
    expect(ApiNotes.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('notes', JSON.stringify(expected.notes));
    expect(appInstance.state).toEqual(expected);
  });

  it('onSaveButtonPress failure', async () => {
    await appInstance.onSaveButtonPress();
    ApiNotes.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    expect(AsyncStorage.setItem).not.toBeCalled();
  });

  it('onDeleteButtonPress success', async () => {
    const expectedBefore = {
      textTitle: '',
      textContent: '',
      notes: [{
        key: '123',
        title: 'some title',
        content: 'some content'
      }]
    };
    appInstance.setState(expectedBefore);

    const expected = {
      textTitle: '',
      textContent: '',
      notes: []
    };
    await appInstance.onDeleteButtonPress({
      key: '123',
      id: '123'
    })();
    expect(ApiNotes.deleteNote).toHaveBeenLastCalledWith('123');
    expect(appInstance.state).toEqual(expected);
  });

});
