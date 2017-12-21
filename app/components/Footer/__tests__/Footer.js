import 'react-native';
import Footer from '../Footer.component';
import React from 'react';

import renderer from 'react-test-renderer';

describe('Footer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Footer characterCount={0} />
    );
    expect(tree).toBeDefined();
  });
});
