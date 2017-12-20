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
