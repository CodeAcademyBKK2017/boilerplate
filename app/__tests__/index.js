import API from '../api';
import App from '../index';
import NoteItem from '../components/NoteItem/NoteItem.component';
import React from 'react';
import renderer from 'react-test-renderer';
import SnackBar from 'react-native-snackbar';
import {AsyncStorage} from 'react-native';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('[{"key":"key", "title":"title","content":"content"}]')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('../api', () => ({
  getNotes: jest.fn(() => Promise.resolve('[{"key":"key", "title":"title","content":"content"}]').then((data) => data.json())),
  addNote: jest.fn(() => Promise.resolve()),
  deleteNote: jest.fn(() => Promise.resolve())
}));

describe('App', () => {

  it('onTitleChangeText: Should be count the current of string', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    return instance.onSaveButtonPress().then(() => {
      instance.onTitleChangeText('Title');
      expect(instance.state.currentTitle).toBe('Title');

      instance.onContentChangeText('Content');
      expect(instance.state.currentContent).toBe('Content');
    
      expect(instance.state).toEqual({
        currentTitle: 'Title',
        currentContent: 'Content',
        modalVisible: false,
        selectedNote: {key: '', title: '', content: ''},
        notes: [{key: 'key', title: 'title', content: 'content'}]
      });
    });
  });

  it('onPressItem', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    instance._onPressItem({title: 'title', content: 'content'})();
    expect(instance.state.modalVisible).toBeTruthy();
  });

  it('_hideOverlay', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    instance._hideOverlay();
    expect(instance.state.modalVisible).toBeFalsy();
  });

  it('Render Items: should get the correct the note item', () => {
    
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    const item = {
      key: 'key',
      title: 'title',
      content: 'content'
    };
    
    const expectedItem = <NoteItem data={item} onPressItem={instance._onPressItem} onDeleteItem={instance._onDeleteItem} />;
    const noteItem = instance._renderItem({item});
    expect(noteItem).toEqual(expectedItem);
  });

  it('Test navigation', () => {
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance._goToAbout('navigate');

    expect(instance.props.navigation.navigate).toHaveBeenCalled();
  });

  it('On delete item', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    const item = {
      key: 'key',
      title: 'title',
      content: 'content'
    };

    instance.setState({
      notes: [item]
    });
    
    instance._onDeleteItem(item)().then(() => {
      expect(instance.state).toEqual({
        currentTitle: '',
        currentContent: '',
        modalVisible: false,
        selectedNote: {key: '', title: '', content: ''},
        notes: []
      });
    });
  });

  it('On Save item: fail', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    API.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    API.addNote.mockImplementation(() => Promise.reject('API failed'));

    return instance.onSaveButtonPress().catch(() => {
      expect(AsyncStorage.setItem).not.toBeCalled();
      expect(SnackBar.show).toHaveBeenCalledWith({backgroundColor: '#d9bf56', duration: 3000, title: 'Network errors: Can\'t connect to server.'});
    });
  });

  it('Load Data', async () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    API.getNotes.mockClear();
    AsyncStorage.getItem.mockClear();

    API.getNotes.mockImplementation(() => Promise.reject('API failed'));
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(undefined));

    await instance.loadData();
    
    expect(AsyncStorage.getItem).toBeCalled();
  });

  it('On delete item: fail', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    API.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    API.deleteNote.mockImplementation(() => Promise.reject('API failed'));

    return instance._onDeleteItem({id: 1})().catch(() => {
      expect(AsyncStorage.setItem).not.toBeCalled();
      expect(SnackBar.show).toHaveBeenCalledWith({backgroundColor: '#d9bf56', duration: 3000, title: 'Network errors: Can\'t connect to server.'});
    });
  });

});

