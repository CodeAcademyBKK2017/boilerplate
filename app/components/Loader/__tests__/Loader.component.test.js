import 'react-native';
import LoaderView from '../Loader.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('LoaderView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoaderView />);
    expect(tree).toBeDefined();
  });

  it('LoaderView: Should return Overlay', () => {
    const tree = renderer.create(<LoaderView />);
    expect(tree).toMatchSnapshot();
  });
});