import Loader from '../Loader.compoments';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import 'react-native';

describe('Loader', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<Loader/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

});