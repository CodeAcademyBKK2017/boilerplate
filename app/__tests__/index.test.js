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

  it('renders onType true', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.onType('test');
    expect(4).toEqual(instance.state.count);
  });

  it('renders onType false', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    instance.onType('test');
    expect(2).not.toEqual(instance.state.count);
  });
});
