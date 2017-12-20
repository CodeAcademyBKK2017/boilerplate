import 'react-native';
import Content from '../Content.component';
import React from 'react';

import renderer from 'react-test-renderer';

describe('Content', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Content />
    );
    expect(tree).toBeDefined();
  });
});
