import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';
// mock function with default result
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('uuid', () => () => 'some uuid');

// constant
const notesKey = 'NOTES';
describe('App', () => {
  let appComp;
  let appInstance;
	
  beforeEach(() => {
    appComp = <App/>;
		
    const wrapper = shallow(appComp);
    appInstance = wrapper.instance();
    
    AsyncStorage.setItem.mockReset();
  });
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('Check Function', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.text).toEqual('');
    instance.texts('some');
    expect(instance.state.text).toEqual('some');
  });
  it('Check Function onTitle', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.textTitle).toEqual('');
    instance.onTitle('some');
    expect(instance.state.textTitle).toEqual('some');
  });
  it('Check Function noteTitle', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.textTitle).toEqual('');
    instance.noteTitle('');
    expect(instance.state.textTitle).toEqual('');
  });
  it('Check Function _keyExtractor', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.textTitle).toEqual('');
    instance._keyExtractor('item');
    expect(instance.state.textTitle).toEqual('');
  });
  it('rendersItem correctly', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const item = {text: 'text', title: 'title', uuid: '1'};
    const snapshot = instance._renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });
  it('Check Function modalOpen', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const item = {text: 'text', title: 'title'};
    instance.modalOpen({item})();
    expect(instance.state.modalVisible).toEqual(true);
  });
  it('modalonClose: should set modalVisibility to false', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.modalonClose();
    expect(instance.state.modalVisible).toEqual(false);
  });
  it('Check Function deleteNote', () => {
    const note00 = {
      unique: 'some uuid',
      text: 'title 00',
      title: 'content 00'
    };
    const initialState = {
      text: '',
      textTitle: '',
      notes: [note00],
      modalVisible: false,
      modalText: [],
      content: ''
    };
    appInstance.setState(initialState);
  
    const curryFunc = appInstance.deleteNote(note00.unique);
    curryFunc();

    const expected = {
      text: '',
      textTitle: '',
      notes: [],
      modalVisible: false,
      modalText: [],
      content: ''
    };
    expect(appInstance.state).toEqual(expected);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expected));
  });
});
