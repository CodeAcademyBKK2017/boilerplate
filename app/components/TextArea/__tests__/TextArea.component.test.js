import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import TextArea from '../TextArea.component';

describe('TextArea', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TextArea />
    );
    expect(tree).toBeDefined();
  });
});
