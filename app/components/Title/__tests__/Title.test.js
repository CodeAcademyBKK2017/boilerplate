
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import Title from '../Title.component';

describe('Title', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<Title />);
    expect(snapshot).toMatchSnapshot();
  });
});