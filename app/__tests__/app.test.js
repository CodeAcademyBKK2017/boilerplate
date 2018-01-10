import API from '../api';
import ConnectedApp from '../app';
import NoteItem from '../components/NoteItem/NoteItem.component';
import React from 'react';
import renderer from 'react-test-renderer';
import SnackBar from 'react-native-snackbar';
import StorageUtil from '../utils/storage.util';

// Note: test renderer must be required after react-native.

import {createStore} from 'redux';
import {shallow} from 'enzyme';

const store = createStore(() => ({notes: []}));

jest.mock('../api', () => ({
  getNotes: jest.fn(() => Promise.resolve([{id: 1, title: 'title', content: 'content'}])),
  addNote: jest.fn(() => Promise.resolve({id: 2, title: 'title', content: 'content'})),
  deleteNote: jest.fn(() => Promise.resolve())
}));

jest.mock('../utils/storage.util', () => ({
  getItem: jest.fn(() => Promise.resolve([{id: 1, title: 'title', content: 'content'}])),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('App', () => {
  const props = {
    navigation: {
      navigate: jest.fn()
    },
    store
  };
  
  let component;
  let wrapper;
  let instance;

  beforeEach(() => {
    component = <ConnectedApp {...props} />;
    wrapper = shallow(component).find('App').shallow();
    instance = wrapper.instance();
    StorageUtil.getItem.mockClear();
    StorageUtil.setItem.mockClear();

    API.getNotes.mockClear();
    API.addNote.mockClear();
    API.deleteNote.mockClear();
  });

  it('App should be renders correctly', () => {
    const tree = renderer.create(component);
    expect(tree).toBeDefined();
  });

  it('onSavePress: Should be count the current of string', () =>  {
    
    wrapper.setProps({
      addNote: jest.fn()
    });

    return instance.onSaveButtonPress().then(() => {

      instance.onTitleChangeText('Title');
      expect(instance.state.currentTitle).toBe('Title');

      instance.onContentChangeText('Content');
      expect(instance.state.currentContent).toBe('Content');
    
      expect(instance.state).toEqual({
        currentTitle: 'Title',
        currentContent: 'Content',
        modalVisible: false,
        selectedNote: {id: '', title: '', content: ''}
      });

      expect(instance.props.addNote).toHaveBeenCalledWith({id: 2, title: 'title', content: 'content'});
    });
  
  });

  it('onPressItem', () => {
    instance._onPressItem({title: 'title', content: 'content'})();
    expect(instance.state.modalVisible).toBeTruthy();
  });

  it('_hideOverlay', () => {
    instance._hideOverlay();
    expect(instance.state.modalVisible).toBeFalsy();
  });

  it('Render Items: should get the correct the note item', () => {
    const item = {
      id: 'id',
      title: 'title',
      content: 'content'
    };
    
    const expectedItem = <NoteItem data={item} onPressItem={instance._onPressItem} onDeleteItem={instance._onDeleteItem} />;
    const noteItem = instance._renderItem({item});
    expect(noteItem).toEqual(expectedItem);
  });

  it('Test navigation', () => {
    instance._goToAbout('navigate');
    expect(instance.props.navigation.navigate).toHaveBeenCalled();
  });

  it('On delete item', () => {
    wrapper.setProps({
      deleteNote: jest.fn()
    });

    const deleteItem = {
      id: '1',
      title: 'title',
      content: 'content'
    };
    
    instance._onDeleteItem(deleteItem)().then(() => {
      expect(instance.state).toEqual({
        currentTitle: '',
        currentContent: '',
        modalVisible: false,
        selectedNote: {id: '', title: '', content: ''}
      });

      expect(instance.props.deleteNote).toHaveBeenCalledWith(deleteItem);
    });
  });

  it('On Save item: fail', () => {
    API.addNote.mockImplementation(() => Promise.reject('API failed'));

    return instance.onSaveButtonPress().catch(() => {
      console.log(SnackBar.show, 'SNAck bacr');
      expect(SnackBar.show).toHaveBeenCalledWith({backgroundColor: '#d9bf56', duration: 3000, title: 'Network errors: Can\'t connect to server.'});
    });
  });

  it('Load Data fail', async () => {
    API.getNotes.mockImplementation(() => Promise.reject('API failed'));
    StorageUtil.getItem.mockImplementation(() => Promise.resolve(undefined));

    await instance.loadData(); 
    
    expect(StorageUtil.getItem).toBeCalled();
  });

  it('On delete item: fail', () => {
    API.deleteNote.mockImplementation(() => Promise.reject('API failed'));

    return instance._onDeleteItem({id: 1})().catch(() => {
      expect(StorageUtil.setItem).not.toBeCalled();
      expect(SnackBar.show).toHaveBeenCalledWith({backgroundColor: '#d9bf56', duration: 3000, title: 'Network errors: Can\'t connect to server.'});
    });
  });

  it('key extractor', () => {
    expect(instance._keyExtractor({id: 1})).toBe(1);
  });

});

