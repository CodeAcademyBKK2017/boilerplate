import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('App', () => {

  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
  });

  it('getName: Should return Yo', () => {
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('Check state', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.titleText).toEqual('');
    expect(instance.state.contentText).toEqual('');
  });

  it('Check Function onContentChange', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onContentChange('some');
    expect(instance.state.contentText).toEqual('some');
    expect(instance.state.contentText.length).toEqual(4);
  });
  
  it('Check Function onTitleChenge', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onTitleChange('title');
    expect(instance.state.titleText).toEqual('title');
  });

  it('Check Function showFlatList', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onTitleChange('React Native');
    instance.onContentChange('- UI');
    instance.onSave();
    expect(instance.showFlatList).toMatchSnapshot();
  }); 

  it('Check Function viewOverlay', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const note = {
      title: 'React Native',
      content: '- UI',
      key: 0
    };
    instance.onShowModal(note);
    expect(instance.viewOverlay).toMatchSnapshot();
  });

  it('Check Function onShowModal', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const note = {
      title: 'React Native',
      content: '- UI',
      key: 0
    };
    instance.onShowModal(note)();
    expect(instance.state.modalData).toEqual(note);
  });

  it('Check Function onCloseModal', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onCloseModal();
    expect(instance.state.modalData).toEqual({});
  });

  it('Check Function onSave', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const expectRes = {
      modalData: {},
      titleText: '',
      contentText: '',
      NOTES: [{
        title: 'React Native',
        content: '- UI',
        key: 0
      }]
    };
    instance.onTitleChange('React Native');
    instance.onContentChange('- UI');
    instance.onSave();
    expect(instance.state).toEqual(expectRes);
  });

  it('Check Function onDelete', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const note = {
      title: 'React Native',
      content: '- UI',
      key: 0
    };
    const expectRes = {
      modalData: {},
      titleText: '',
      contentText: '',
      NOTES: []
    };
    instance.onTitleChange('React Native');
    instance.onContentChange('- UI');
    instance.onSave();
    instance.onDelete(note)();
    expect(instance.state).toEqual(expectRes);
  });

  const notesKey = 'state';

  it('componentDidMount with existed notes', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    const notes = [
      {
        key: 'some uuid',
        title: 'my test title',
        content: 'my test message'
      }
    ];
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(notes)));

    instance.componentDidMount();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });

  it('componentDidMount with null', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();

    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null));
    
    instance.componentDidMount();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(notesKey);
  });

});
