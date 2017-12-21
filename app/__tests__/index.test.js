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
  it('onTypeContent: should change the length', () => {
    const tree = shallow(<App/>);
    const instance = tree.instance();
    instance.onTypeContent('hello');
    expect(instance.state.content.length).toBe(5);
    instance.onTypeContent('');
    expect(instance.state.content.length).toBe(0);
  });
});
