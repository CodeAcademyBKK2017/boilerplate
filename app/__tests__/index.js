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

  it('onChangeText: Should be count the current of string', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onChangeText('abcd');
    expect(instance.state.characterCount).toBe(4);
  });
});
