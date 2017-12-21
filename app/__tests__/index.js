import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
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
  const item = {title: 'title', uuid: '1'};
  const snapshot = instance._renderItem({item});
  expect(snapshot).toMatchSnapshot();
});