import React from 'react';
import renderer from 'react-test-renderer';
import Title from '../Title.component';

describe('Title', () => {
  it('snapshot test', () => {
    const snapshot = renderer.create(<Title />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});