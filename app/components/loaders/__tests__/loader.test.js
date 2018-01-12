import Loader from '../loader.component';
import React from 'react';
import renderer from 'react-test-renderer';
import  'react-native';

// Note: test renderer must be required after react-native.
// import uuid from 'uuid';;

describe('Loader', () => {

  it('Loader: renders correctly', () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});