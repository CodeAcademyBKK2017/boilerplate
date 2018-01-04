import 'react-native';
import AboutDev from '../AboutDev.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AboutDev', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AboutDev />
    );
    expect(tree).toBeDefined();
  });

  it('AboutDev: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<AboutDev />);
    expect(tree).toMatchSnapshot();
  });
});