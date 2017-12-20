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
  it('changeText: Should return someText Change', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.changeText('123');
    expect(instance.state.content).toEqual('123');
  });

});
