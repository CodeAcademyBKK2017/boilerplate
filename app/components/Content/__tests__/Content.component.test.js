import 'react-native';
import Content from '../Content.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Content', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<Content />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
