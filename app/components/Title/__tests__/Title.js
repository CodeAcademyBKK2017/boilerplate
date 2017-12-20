import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Title from '../Title.component';

describe('Title', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Title />
    );
    expect(tree).toBeDefined();
  });
});
