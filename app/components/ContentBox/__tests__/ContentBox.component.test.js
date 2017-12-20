import 'react-native';
import ContentBox from '../ContentBox.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('TextArea', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ContentBox />
    );
    expect(tree).toBeDefined();
  });

  it('TextArea: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<ContentBox />);
    expect(tree).toMatchSnapshot();
  });
});