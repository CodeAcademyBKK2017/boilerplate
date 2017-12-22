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
    const snapshot = instance.modalOpen({item})();
    expect(snapshot).toMatchSnapshot();
  });
  it('Check Function modalonClose', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const snapshot = instance.modalonClose();
    expect(snapshot).toMatchSnapshot();
  });
});
