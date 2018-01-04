import App from '../Router/main';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {AsyncStorage} from 'react-native';
// mport {inspect} from 'util';
import {shallow} from 'enzyme';

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
    instance.onCount('some');
    expect(instance.state.text).toEqual('some');
  });
  it('Check Function onTitle', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.title).toEqual('');
    instance.onTitle('some');
    expect(instance.state.title).toEqual('some');
  });
  it('Check Function saveNote', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.title).toEqual('');
    instance.saveNote('');
    expect(instance.state.title).toEqual('');
  });
  it('Check Function _keyExtractor', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.title).toEqual('');
    instance._keyExtractor('12345');
    expect(instance.state.title).toEqual('');
  });
  it('rendersItem correctly', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const item = {title: 'title', content: 'content', uuid: '1'};
    const snapshot = instance._renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });
  it('Check Function openModal', () => {
    const wrapper = shallow(<App/>);
    const item = {title: 'title', content: 'content', uuid: '1'};
    const instance = wrapper.instance();
    instance.openModal({item})();
    expect(instance.state.modalVisible).toEqual(true);
  });
  it('closeModal: should set modalVisibility to false', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.closeModal();
    expect(instance.state.modalVisible).toEqual(false);
  });
  it('delNote: AsyncStorage', () => {
    const note00 = {
      unique: 'some uuid',
      title: 'title 00',
      content: 'content 00'
    };
    const initialState = {
      title: '',
      text: '',
      NOTES: [note00],
      modalVisible: false,
      modalText: [],
      content: ''
    };
    appInstance.setState(initialState);
    
    const curryFunc = appInstance.delNote(note00.unique);
    curryFunc();
  
    const expected = {
      title: '',
      text: '',
      NOTES: [],
      modalVisible: false,
      modalText: [],
      content: ''
    };
    expect(appInstance.state).toEqual(expected);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(notesKey, JSON.stringify(expected));
  });
  it('pageAbout with mock', () => {
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    const appComp = <App {...props}/>;
    const wrapper = shallow(appComp);
    const appInstance = wrapper.instance();

    appInstance.pageAbout();

    expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  it('pageAbout with spy', () => {
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    const appComp = <App {...props}/>;
    const wrapper = shallow(appComp);
    const appInstance = wrapper.instance();
    const spyFunc = jest.spyOn(props.navigation, 'navigate');

    appInstance.pageAbout();
    
    expect(spyFunc).toHaveBeenCalledWith('About');
  });
});
