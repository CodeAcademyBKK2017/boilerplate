import 'react-native';
import AboutApp from '../AboutApp.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AboutApp', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AboutApp />
    );
    expect(tree).toBeDefined();
  });

  it('AboutApp: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<AboutApp />);
    expect(tree).toMatchSnapshot();
  });
});