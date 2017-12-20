import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TitleBox from '../TitleBox.component';

describe('TitleBox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TitleBox />
    );
    expect(tree).toBeDefined();
  });

  it('TitleBox: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<TitleBox />);
    expect(tree).toMatchSnapshot();
  });
});