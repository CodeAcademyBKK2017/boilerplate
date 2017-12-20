import 'react-native';
import ContentBox from '../ContentBox.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('ContentBox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ContentBox />
    );
    expect(tree).toBeDefined();
  });

  it('ContentBox: MatchSnapshot', () => { // example to test class methods
    const tree = renderer.create(<ContentBox />);
    expect(tree).toMatchSnapshot();
  });
});