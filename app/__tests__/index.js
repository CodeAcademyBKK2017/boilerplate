import 'react-native';
import App from '../index';
import NoteItem from '../components/NoteItem/NoteItem.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('[{"key":"key", "title":"title","content":"content"}]')),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });

  it('onTitleChangeText: Should be count the current of string', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onTitleChangeText('Title');
    expect(instance.state.currentTitle).toBe('Title');

    instance.onContentChangeText('Content');
    expect(instance.state.currentContent).toBe('Content');

    instance.onSaveButtonPress();
    expect(instance.state).toEqual({
      currentTitle: '',
      currentContent: '',
      modalVisible: false,
      selectedNote: {key: '', title: '', content: ''},
      notes: [{
        key: 'key',
        title: 'Title', 
        content: 'Content'
      }]
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
    
    instance._onDeleteItem(item)();
    expect(instance.state).toEqual({
      currentTitle: '',
      currentContent: '',
      modalVisible: false,
      selectedNote: {key: '', title: '', content: ''},
      notes: []
    });
    
  });
  
});

