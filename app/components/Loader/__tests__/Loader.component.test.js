import 'react-native';
import Loader from '../Loader.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Loader', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<Loader />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
