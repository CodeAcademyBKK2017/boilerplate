import 'react-native';
import Footer from '../Footer.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Footer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Footer />
    );
    expect(tree).toBeDefined();
  });
});
