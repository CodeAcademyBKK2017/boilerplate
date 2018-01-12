import ApiNotes from '../api';
import ConnectedApp, {mapDispatchToProps}  from '../app';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Alert} from 'react-native';
import {createStore} from 'redux';
import {getItemToStorage, setItemToStorage} from '../utils/storageutil';
import {shallow} from 'enzyme';

const store = createStore(() => ({}));

jest.mock('Alert', () => ({
  alert: jest.fn()
}));
jest.mock('../api');
jest.mock('../utils/storageutil');

describe('App', () => {
  let wrapper, instance, appComp;
  beforeEach(() => {
    appComp = <ConnectedApp store={store}/>;
    wrapper = shallow(appComp).find('App').shallow();
    instance = wrapper.instance();
    ApiNotes.addNote.mockClear();
    ApiNotes.deleteNote.mockClear();
    ApiNotes.getNotes.mockClear();
    setItemToStorage.mockClear();
    getItemToStorage.mockClear();
  });
  it('renders correctly', () => {
    const tree = renderer.create(appComp);
    expect(tree).toMatchSnapshot();
  });
  it('changeTitle: Should have state Change', () => {
    instance.changeTitle('123');
    expect(instance.state.title).toEqual('123');
  });
  it('changeContent: Should have state Change', () => {
    instance.changeContent('123');
    expect(instance.state.content).toEqual('123');
  });
  it('goToAbout', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.goToAbout();
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenLastCalledWith({'routeName': 'About', 'type': 'Navigation/NAVIGATE'});
  });
  it('onSave success ', async () => {
    const note = {
      title: 'this is title',
      content: 'this is content'
    };
    const expectedNote = {
      title: 'this is title',
      content: 'this is content'
    };
    const expectedNoteWithId = {
      title: 'this is title',
      content: 'this is content',
      id: 1
    };
    const noteList = [expectedNoteWithId];

    instance.setState(note);
    ApiNotes.addNote.mockImplementation(() => Promise.resolve({...note, id: 1}));
    const addNote = jest.fn();
    wrapper.setProps({addNote: addNote});
    await instance.onSave();
    expect(ApiNotes.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(instance.props.addNote).toHaveBeenLastCalledWith(expectedNoteWithId);
    expect(setItemToStorage).toHaveBeenLastCalledWith('storageNote', noteList);
  });

  it('onSave failure', async () => {
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    await instance.onSave();
    expect(setItemToStorage).not.toBeCalled();
    expect(Alert.alert).toHaveBeenLastCalledWith(
      'Save Failed',
      'API failed',
      [{text: 'OK'}],
      {cancelable: false});
  });
  it('onDelete success', async () => {
    const item = {
      id: 'someid',
      title: 'title x',
      content: 'content x'
    };
    const initialNote = [
      {id: 1, title: 'title y', content: 'content y'},
      item
    ];
    const remainNote = [{id: 1, title: 'title y', content: 'content y'}];
    wrapper.setProps({noteList: initialNote});
    const deleteNote = jest.fn();
    wrapper.setProps({deleteNote: deleteNote});
    const curryFn = instance.onDelete(item);
    await curryFn();
    expect(ApiNotes.deleteNote).toHaveBeenLastCalledWith(item.id);
    expect(setItemToStorage).toHaveBeenLastCalledWith('storageNote', remainNote);
  });
  it('onDelete failure', async () => {
    const item = {
      id: 'failid',
      title: 'fail title',
      content: 'fail message'
    };
    ApiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    const curryFn = instance.onDelete(item);
    await curryFn();
    expect(Alert.alert).toHaveBeenLastCalledWith(
      'Delete Failed',
      'API failed',
      null,
      {cancelable: false});
  });
  it('init Success Case', async () => {
    const noteList = [{id: 1, title: 'get title', content: 'get content'}];
    ApiNotes.getNotes.mockImplementation(() => Promise.resolve(noteList));
    const populateNote = jest.fn();
    wrapper.setProps({populateNote: populateNote});
    await instance.init();
    expect(ApiNotes.getNotes).toHaveBeenCalled();
    expect(instance.props.populateNote).toHaveBeenLastCalledWith(noteList);
  });
  it('init Fail Case', async () => {
    const note = [{id: 1, title: 'get title', content: 'get content'}];
    ApiNotes.getNotes.mockImplementation(() => Promise.reject('API failed'));
    getItemToStorage.mockImplementation(() => note);
    const populateNote = jest.fn();
    wrapper.setProps({populateNote: populateNote});
    await instance.init();
    expect(getItemToStorage).toHaveBeenLastCalledWith('storageNote');
    expect(instance.props.populateNote).toHaveBeenLastCalledWith(note);
  });
});
