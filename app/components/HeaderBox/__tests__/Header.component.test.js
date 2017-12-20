import 'react-native';
import HeaderBox from '../HeaderBox.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('TextArea', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <HeaderBox />
    );
    expect(tree).toBeDefined();
  });

  it('TextArea: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<HeaderBox />);
    expect(tree).toMatchSnapshot();
  });
});