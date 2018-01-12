import 'react-native';
import Loader from '../Loader.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Loader', () => {
  it('snapshot test', () => {
    const param = {Isvisible: false};
    const snapshot = renderer.create(<Loader visibility={param} />);
    expect(snapshot).toMatchSnapshot();
  });
});