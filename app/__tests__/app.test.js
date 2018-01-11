import Api from '../api';
import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import storageutil from '../utils/storageutil';

// Note: test renderer must be required after react-native.
import {Alert} from 'react-native';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

const store = createStore(() => ({notes: []}));
jest.mock('uuid', () => () => 'some uuid');

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

jest.mock('../utils/storageutil', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('../api', () => ({
  onGetNote: jest.fn(() => Promise.resolve([])),
  onAddNote: jest.fn(() => Promise.resolve({title: 'mock', content: 'mock', id: 1})),
  onDelete: jest.fn(() => Promise.resolve())
}));

// constant
// const notesKey = 'notes';

// test case
describe('App', () => {
  let appComp;
  let appInstance;
  let appWrapper;
	
  beforeEach(() => {
    appComp = <ConnectedApp  store={store}/>;
		
    const wrapper = shallow(appComp);
    appWrapper = wrapper.find('App').shallow();
    appInstance = appWrapper.instance();
    
    storageutil.setItem.mockClear();
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
    appInstance.setState({textTitle: title, textContent: content});

    const props = {
      addNote: jest.fn()
    };

    appWrapper.setProps(props);

    await appInstance.onSaveButtonPress();
    
    const expected = {
      textTitle: '',
      textContent: '',
      notes: [{
        title,
        content,
        id: 1
      }]
    };

    const expectedNote = {
      'content': 'my test message',
      'title': 'my test title'
    };
    expect(Api.onAddNote).toHaveBeenLastCalledWith(expectedNote);
    expect(storageutil.setItem).toHaveBeenLastCalledWith(expected.notes);
    // expect(appInstance.props.addNote).toHaveBeenCalledWith(expected.notes);
    
  });

  it('onSaveButtonPress failure', async () => {
    Api.onAddNote.mockClear();
    storageutil.setItem.mockClear();

    Api.onAddNote.mockImplementation(() => Promise.reject('API failed'));
    await appInstance.onSaveButtonPress();
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Internet error',
      {cancelable: true}
    );
    expect(storageutil.setItem).not.toBeCalled();
  });

  it('onDeleteButtonPress success', async () => {
    const note00 = {
      id: 1,
      title: 'title 00',
      content: 'content 00'
    };
    
    const props = {
      notes: [note00],
      deleNote: jest.fn()
    };

    appWrapper.setProps(props);

    const dispatch = jest.fn();
    const propss = mapDispatchToProps(dispatch);
    propss.deleNote(note00);
    
    const delFunc = appInstance.onDeleteButtonPress(note00);
    await delFunc();
    // expect(dispatch).toHaveBeenLastCalledWith({
    //   payload: {
    //     'content': 'content 00', 
    //     'id': 1, 
    //     'title': 'title 00'
    //   }, 
    //   'type': 'DELE_NOTE'
    // });
    expect(dispatch).toHaveBeenCalled();
    expect(Api.onDelete).toHaveBeenLastCalledWith(note00.id);
    expect(storageutil.setItem).toHaveBeenLastCalledWith([]);
    // expect(appInstance.props.deleNote).toHaveBeenCalledWith(expected.notes);
  });

  it('onDeleteButtonPress failure', async () => {
    Api.onDelete.mockClear();
    storageutil.setItem.mockClear();
    Alert.alert.mockClear();     
    Api.onDelete.mockImplementation(jest.fn(() => Promise.reject('API fail')));

    await appInstance.onDeleteButtonPress()();
    expect(Alert.alert).toHaveBeenLastCalledWith(
      'Error',
      'Internet error',
      {cancelable: true}
    );
    expect(storageutil.setItem).not.toBeCalled();
  });

  it('onShowAboutUs', () => {
    // const props = {
    //   navigation: {
    //     navigate: jest.fn()
    //   }
    // };
    // appWrapper.setProps(props);
    // appInstance.onShowAboutUs();
    // expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');

    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.showAboutUs();
    expect(dispatch).toHaveBeenLastCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });

  it('componentDidMount with existed notes', async () => {
    const notes = [
      {
        key: 'some uuid',
        title: 'my test title',
        content: 'my test message'
      }
    ];

    Api.onGetNote.mockClear();
    Api.onGetNote.mockImplementation(() => Promise.reject('API Fail'));

    // set custom mock result
    storageutil.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(notes)));

    await appInstance.componentDidMount();

    expect(storageutil.getItem).toHaveBeenCalledWith();
  });

  it('componentDidMount with null', async () => {
    // set custom mock result
    storageutil.getItem.mockImplementation(() => Promise.resolve(null));
    
    Api.onGetNote.mockClear();
    Api.onGetNote.mockImplementation(async () => await Promise.reject('API Error'));

    await appInstance.componentDidMount();

    expect(storageutil.getItem).toHaveBeenCalledWith();
  });
  
});
