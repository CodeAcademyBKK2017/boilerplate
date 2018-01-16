import ApiNotes from '../api';
import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {createStore} from 'redux';

import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

const store = createStore(() => ({notes: []}));

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

jest.mock('../api', () => ({
  addNote: jest.fn(() => Promise.resolve()),
  deleteNote: jest.fn(() => Promise.resolve()),
  getNotes: jest.fn(() => Promise.resolve())
}));

jest.mock('uuid', () => () => 'some uuid');

const notesKey = 'notes';

describe('App', () => {
  let appComp;
  let appInstance;
  let wrapper;
	
  beforeEach(() => {
    const saveNoteFn = jest.fn(() => {});
    const removeNoteFN = jest.fn(() => {});
    appComp = <ConnectedApp store={store}/>;
		
    wrapper = shallow(appComp).find('App').shallow();
    wrapper.setProps({
      saveNote: saveNoteFn,
      removeNote: removeNoteFN
    });
    appInstance = wrapper.instance();
    
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();

    ApiNotes.getNotes.mockClear();
    ApiNotes.addNote.mockClear();
    ApiNotes.deleteNote.mockClear();

    Alert.alert.mockClear();
  });

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
    appInstance.onSaveButtonPress();

    const expected = {
      textTitle: '',
      textContent: '',
      notes: [
        {
          id: 'some uuid',
          title,
          content
        }
      ]
    };

    // expect(ApiNotes.addNote).toHaveBeenCalled();
    // expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expected.notes));
    expect(appInstance.props.saveNote).toHaveBeenCalled();
  });

  it('onDeleteButtonPress', async () => {
    const note00 = {
      id: 'some uuid',
      title: 'title 00',
      content: 'content 00'
    };
    const initialState = {
      textTitle: '',
      textContent: '',
      notes: [note00]
    };
    appInstance.setState(initialState);
    
    const deleleHandler = appInstance.onDeleteButtonPress(note00);
    deleleHandler();
    expect(appInstance.props.removeNote).toHaveBeenCalled();
  });

  xit('loadData with existed notes', async () => {
    // set custom mock result
    ApiNotes.getNotes.mockImplementation(jest.fn(() => Promise.reject()));

    await appInstance.loadData();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });

  xit('componentDidMount with null', async () => {
    ApiNotes.getNotes.mockImplementation(jest.fn(() => Promise.reject()));

    AsyncStorage.getItem.mockImplementation(() => Promise.resolve('{}'));
    await appInstance.loadData();
    // await appInstance.componentDidMount();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
    // expect(appInstance.loadData).toHaveBeenCalled();
  });

  it('goToAbout called', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).goToAbout();
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });

  xit('onAboutButtonPress with mock', () => {
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    // const appComp = <ConnectedApp store={store} {...props}/>;
    // const wrapper = shallow(appComp);
    // const appInstance = wrapper.find('App').shallow().instance();
    wrapper.setProps(props);

    appInstance.onAboutButtonPress();

    expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  xit('onAboutButtonPress with spy', () => {
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    // const appComp = <App {...props}/>;
    // const wrapper = shallow(appComp);
    // const appInstance = wrapper.instance();
    wrapper.setProps(props);
    const spyFunc = jest.spyOn(props.navigation, 'navigate');

    appInstance.onAboutButtonPress();
    
    expect(spyFunc).toHaveBeenCalledWith('About');
  });

  xit('loadData test case', async () => {
    await appInstance.loadData();
    expect(ApiNotes.getNotes).toHaveBeenCalled();
    expect(appInstance.props.getNotes).toHaveBeenCalled();
  });
  
  xit('onSaveButtonPress fail catch', async () => {
    ApiNotes.addNote.mockImplementation(jest.fn(() => Promise.reject()));

    await appInstance.onSaveButtonPress(); 
    expect(Alert.alert).toHaveBeenCalled();
  });

  xit('onDeleteButtonPress fail catch', async () => {
    ApiNotes.deleteNote.mockImplementation(jest.fn(() => Promise.reject()));
    await appInstance.onDeleteButtonPress({id: 123})(); 
    expect(Alert.alert).toHaveBeenCalled();
  });

});
