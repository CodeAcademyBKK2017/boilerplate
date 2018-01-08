import api from '../api';
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {Alert, AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => '123');
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));
jest.mock('Alert', () => ({
  alert: jest.fn()
}));
jest.mock('../api');

describe('App', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('onKeyPressTitle: Success', () => {
    instance.onKeyPressTitle('Title');
    expect(instance.state.titleTextInput).toEqual('Title');
  });
  it('onKeyPressTitle: Failure', () => {
    instance.onKeyPressTitle('Title XXX');
    expect(instance.state.titleTextInput).not.toEqual('Title');
  });
  it('onKeyPressContent: Success', () => {
    instance.onKeyPressContent('123 45');
    expect(instance.state.contentTextInput).toEqual('123 45');
  });
  it('onKeyPressContent: Failure', () => {
    instance.onKeyPressContent('123 45 6');
    expect(instance.state.contentTextInput).not.toEqual('123 45');
  });
  // it('onSave: Success', () => {
  //   const newNoteState = {titleTextInput: 'Title', contentTextInput: 'Content'};
  //   const expectedState = {
  //     titleTextInput: '',
  //     contentTextInput: '',
  //     notes: [
  //       {title: 'Title', content: 'Content', id: '123'}
  //     ]
  //   };
  //   instance.setState(newNoteState);
  //   instance.onSave();
  //   expect(instance.state).toMatchObject(expectedState);
  // });
  it('onSave: Success', async () => {
    const newNoteState = {titleTextInput: 'someTitle', contentTextInput: 'someContent'};
    const expectedNote = {title: 'someTitle', content: 'someContent'};
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {id: 0, title: 'someTitle', content: 'someContent'},
        {id: 1, title: 'someTitle', content: 'someContent'}
      ]
    };
    instance.setState(newNoteState);
    await instance.onSave();
    expect(api.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('notes', JSON.stringify(expectedState.notes));
    expect(instance.state).toEqual(expectedState);
  });
  // it('onSave: Failure', () => {
  //   const newNoteState = {titleTextInput: '', contentTextInput: ''};
  //   const expectedState = {
  //     titleTextInput: '',
  //     contentTextInput: '',
  //     notes: [
  //       {title: 'Title', content: 'Content', id: '123'}
  //     ]
  //   };
  //   instance.setState(newNoteState);
  //   instance.onSave();
  //   expect(instance.state).not.toMatchObject(expectedState);
  // });
  it('onSave: Failure', async () => {
    api.addNote.mockClear();
    Alert.alert.mockClear();
    AsyncStorage.setItem.mockClear();
    api.addNote.mockImplementation(() => Promise.reject('API failed'));
    instance.setState({titleTextInput: 'someTitle', contentTextInput: 'someContent'});
    await instance.onSave();
    expect(AsyncStorage.setItem).not.toBeCalled();
    expect(Alert.alert).toHaveBeenLastCalledWith('save Note API fail!', 'API failed',
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      });
  });
  // it('onDeleteNote: Success', () => {
  //   const initState = {
  //     titleTextInput: '',
  //     contentTextInput: '',
  //     notes: [
  //       {title: 'Title', content: 'Content', id: '123'}
  //     ]
  //   };
  //   const expectedState = {
  //     titleTextInput: '',
  //     contentTextInput: '',
  //     notes: []
  //   };
  //   const itemToDelete = {title: 'Title', content: 'Content', id: '123'};
  //   instance.setState(initState);
  //   instance.onDeleteNote(itemToDelete)();
  //   expect(instance.state).toMatchObject(expectedState);
  // });
  it('onDeleteNote: Success', async () => {
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {id: 0, title: 'someTitle', content: 'someContent'}
      ]
    };
    await instance.onDeleteNote({id: 1})();
    expect(api.deleteNote).toHaveBeenLastCalledWith(1);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('notes', JSON.stringify(expectedState.notes));
    expect(instance.state).toEqual(expectedState);
  });
  it('navigateTo (mock)', () => {
    instance.props.navigation.navigate = jest.fn();
    instance.navigateTo('About')();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });
  it('navigateTo (spy)', () => {
    const spyFunc = jest.spyOn(instance.props.navigation, 'navigate');
    instance.navigateTo('About')();
    expect(spyFunc).toHaveBeenCalledWith('About');
  });
});