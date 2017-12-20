import 'react-native';
import HeaderBox from '../HeaderBox.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('HeaderBox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <HeaderBox />
    );
    expect(tree).toBeDefined();
  });

  it('HeaderBox: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<HeaderBox />);
    expect(tree).toMatchSnapshot();
  });
});