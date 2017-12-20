
import React from 'react';
import 'react-native';
import Content from '../Content.component';
import renderer from 'react-test-renderer';

describe('Content', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<Content />);
    expect(snapshot).toMatchSnapshot();
  });
});