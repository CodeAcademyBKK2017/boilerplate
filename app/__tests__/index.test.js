import 'react-native';
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('onType: should change the length', () => {
    const tree = shallow(<App/>);
    const instance = tree.instance();
    instance.onType('hello');
    expect(instance.state.countContent).toBe(5);
    instance.onType('');
    expect(instance.state.countContent).toBe(0);
  });
});
