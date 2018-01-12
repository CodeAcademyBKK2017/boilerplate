import Loader from '../Loader.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Loader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Loader />);
    expect(tree).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});