import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TitleBox from '../TitleBox.component';

describe('TextArea', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TitleBox />
    );
    expect(tree).toBeDefined();
  });

  it('TextArea: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<TitleBox />);
    expect(tree).toMatchSnapshot();
  });
});