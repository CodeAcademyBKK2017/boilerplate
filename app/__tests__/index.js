import ApiNotes from '../api';
import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {createStore} from 'redux';
// Note: test renderer must be required after react-native.
import {NavigationActions} from 'react-navigation';
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
  let appWrapper;
  let appInstance;
	
  beforeEach(() => {
    appComp =  <ConnectedApp store={store}/>;
		
    const wrapper = shallow(appComp);

    appWrapper = wrapper.find('App').shallow();
    appInstance = appWrapper.instance();
    
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
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    
    await appInstance.onSaveButtonPress();
    
    expect(AsyncStorage.setItem).not.toBeCalled();
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

  it('onDeleteButtonPress failure', async () => {
    // ApiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    // const note00 = {
    //   id: 1,
    //   title: 'title 00',
    //   content: 'content 00'
    // };
    
    // const curryFunc = appInstance.onDeleteButtonPress(note00);
    // await curryFunc();

    // expect(Alert.alert).toHaveBeenCalledWith(
    //   'Delete Failed',
    //   'API failed',
    //   null,
    //   {cancelable: false}
    // );
    
  });

  it('loadData with existed notes', async () => {
    const props = {
      populateNotes: jest.fn()
    };
    const appComp =  <ConnectedApp store={store}/>;
    const wrapper = shallow(appComp);
    const appWrapper = wrapper.find('App').shallow();
    appWrapper.setProps(props);
    const appInstance = appWrapper.instance();
    
    await appInstance.loadData();

    expect(ApiNotes.getNotes).toBeCalled();
    expect(appInstance.props.populateNotes).toHaveBeenCalledWith([{
      id: 1,
      title: 'my test title',
      content: 'my test message'
    }]);
  });

  xit('loadData with empty', async () => {

    await appInstance.loadData();
    expect(ApiNotes.getNotes).toBeCalled();
  });

  it('onAboutButtonPress with mock', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).gotoAbout();
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });

  xit('onAboutButtonPress with spy', () => {
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    appComp =  <ConnectedApp store={store} {...props}/>;
    const wrapper = shallow(appComp);
    appInstance = wrapper.find('App').shallow().instance();
    const spyFunc = jest.spyOn(props.navigation, 'navigate');

    appInstance.onAboutButtonPress();
    
    expect(spyFunc).toHaveBeenCalledWith('About');
  });
});
