import 'react-native';
import FooterBox from '../FooterBox.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('TextArea', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FooterBox />
    );
    expect(tree).toBeDefined();
  });

  it('TextArea: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<FooterBox />);
    expect(tree).toMatchSnapshot();
  });
});