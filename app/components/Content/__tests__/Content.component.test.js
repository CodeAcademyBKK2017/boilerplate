import 'react-native';
import Content from '../Content.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Content', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Content />
    );
    expect(tree).toBeDefined();
  });
});
