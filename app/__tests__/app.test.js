import API from '../api';
import ConnectedApp, {mapDispatchToProps} from '../app';
import NoteItem from '../components/NoteItem/NoteItem.component';
import React from 'react';
import renderer from 'react-test-renderer';
import SnackBar from 'react-native-snackbar';
import StorageUtil from '../utils/storage.util';
import {createStore} from 'redux';

// Note: test renderer must be required after react-native.

import {NavigationActions} from 'react-navigation';
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

  it('onTitleChangeText should be title', () => {
    instance.onTitleChangeText('title');
    expect(instance.state.currentTitle).toBe('title');
  });

  it('onContentChangeText should be title', () => {
    instance.onContentChangeText('content');
    expect(instance.state.currentContent).toBe('content');
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

  it('Test navigate to about', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).navigateToAbout();
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'AboutApp'}));
  });

  it('onSavePress: Should be count the current of string', () =>  {
    
    wrapper.setProps({
      addNoteRequest: jest.fn()
    });

    instance.onTitleChangeText('title');
    instance.onContentChangeText('content');
    instance.onSaveButtonPress();

    expect(instance.props.addNoteRequest).toHaveBeenCalledWith({title: 'title', content: 'content'});
  
  });

  it('On delete item', () => {
    const deleteItem = {
      id: '1',
      title: 'title',
      content: 'content'
    };
    
    wrapper.setProps({
      deleteNoteRequest: jest.fn()
    });

    instance._onDeleteItem(deleteItem)();

    expect(instance.props.deleteNoteRequest).toHaveBeenCalledWith(deleteItem);
  });

  it('key extractor', () => {
    expect(instance._keyExtractor({id: 1})).toBe(1);
  });

});

