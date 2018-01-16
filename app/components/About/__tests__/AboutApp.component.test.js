import 'react-native';
import AboutApp from '../AboutApp.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('AboutApp', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<AboutApp/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
