import 'react-native';
import FooterBox from '../FooterBox.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('FooterBox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FooterBox />
    );
    expect(tree).toBeDefined();
  });

  it('FooterBox: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<FooterBox />);
    expect(tree).toMatchSnapshot();
  });
});