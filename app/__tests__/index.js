
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import {AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('{}')),
  setItem: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve('{}'))
}));
jest.mock('uuid', () => () => 'someUUID');

describe('App', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
  });
  it('changeTitle: Should have state Change', () => {
    instance.changeTitle('123');
    expect(instance.state.title).toEqual('123');
  });
  it('changeContent: Should have state Change', () => {
    instance.changeContent('123');
    expect(instance.state.content).toEqual('123');
  });
  it('onSave: Should have state Change', () => {
    wrapper.setState({title: 'someTitle', content: 'someContent'});
    // instance.setState({title: 'someTitle', content: 'someContent'});
    instance.onSave();
    expect(instance.state.note).toEqual([{title: 'someTitle', content: 'someContent', key: 'someUUID'}]);
    instance.setState({title: 'abc', content: 'def'});
    instance.onSave();
    expect(instance.state.note).toEqual([
      {title: 'someTitle', content: 'someContent', key: 'someUUID'},
      {title: 'abc', content: 'def', key: 'someUUID'}
    ]);
  });
  it('onDelete Should have Change state', () => {
    const item = {title: 'y', content: 2, key: 2};
    const expectedState = {
      title: '',
      content: '',
      note: [{title: 'x', content: 1, key: 1}]
    };
    instance.setState({
      note: [{title: 'x', content: 1, key: 1}, {title: 'y', content: 2, key: 2}]});

    instance.onDelete(item)();
    expect(instance.state.note).toEqual(expectedState.note);
  });
  it('init should have been call with new note', () => {
    const storageNote = [
      {
        key: 'some uuid',
        title: 'some title',
        content: 'some message'
      }
    ];
      // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(storageNote)));
    instance.init();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('storageNote');
  });
  it('init should have been call with nothing', () => {
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null));
    instance.init();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('storageNote');
  });
  it('goToAbout', () => {
    const navigation = {navigate: jest.fn()};
    wrapper.setProps({navigation: navigation});
    // instance.setProps({navigation: navigation});
    instance.goToAbout();
    expect(instance.props.navigation.navigate).toHaveBeenCalled();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });
  it('goToAbout with spyOn Function', () => {
    const props = {
      navigation: {navigate: jest.fn()}
    };
    wrapper = shallow(<App {...props}/>);
    instance = wrapper.instance();
    const spyFn = jest.spyOn(props.navigation, 'navigate');
    instance.goToAbout();
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('About');
  });
});
