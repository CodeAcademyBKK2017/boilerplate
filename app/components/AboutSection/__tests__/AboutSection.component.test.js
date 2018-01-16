import 'react-native';
import AboutSection from '../AboutSection.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('AboutSection', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<AboutSection/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
