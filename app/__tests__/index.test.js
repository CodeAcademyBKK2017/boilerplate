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
  //   it('getName: Should return Yo', () => { // example to test class methods
  //     const props = {};
  //     const wrapper = shallow(<App {...props}/>);
  //     const instance = wrapper.instance();
  //     expect(instance.getName()).toEqual('Yo');
  //   });

  it('renders onTypeContent true', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.onTypeContent('test');
    expect(4).toEqual(instance.state.count);
    expect('test').toEqual(instance.state.inputContent);
  });

  it('renders onTypeContent false', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.onTypeContent('test');
    expect(2).not.toEqual(instance.state.count);
    expect('test11').not.toEqual(instance.state.inputContent);
  });

  it('renders onTypeTitle true', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.onTypeTitle('test');
    expect('test').toEqual(instance.state.inputTitle);
  });

  it('renders onSaveNote true', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.setState({'inputTitle': 't1', 'inputContent': 't2'});
    instance.onSaveNote();
    expect([{'title': 't1', 'content': 't2'}]).toMatchObject(instance.state.note);
  });
});
