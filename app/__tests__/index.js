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

  it('onChangeTextContent', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.onChangeTextContent('asdf');

    const expectedState = {
      textContent: 'asdf'
    };
    expect(instance.state.textContent).toBe(expectedState.textContent);
  });
});
