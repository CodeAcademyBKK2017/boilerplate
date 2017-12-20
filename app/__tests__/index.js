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
  it('onKeyPress: Success', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onKeyPress('123 45');
    expect(instance.state.countContentCharacters).toEqual(6);
  });
  it('onKeyPress: Failure', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onKeyPress('123 45');
    expect(instance.state.countContentCharacters).not.toEqual(3);
  });
});