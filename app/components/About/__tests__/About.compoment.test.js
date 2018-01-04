import 'react-native';
import About from '../About.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Content', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<About />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});