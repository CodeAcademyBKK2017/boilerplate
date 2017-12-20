import 'react-native';
import Footer from '../Footer.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Footer', () => {
  it('snapshot test', () => {
    const snapshot = renderer.create(<Footer />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});