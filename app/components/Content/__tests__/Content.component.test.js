import 'react-native';
import Content from '../Content.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Content', () => {
  it('snapshot test', () => {
    const snapshot = renderer.create(<Content />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});