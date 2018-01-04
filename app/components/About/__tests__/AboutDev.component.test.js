import 'react-native';
import AboutDev from '../AboutDev.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AboutDev', () => {
  it('snapshot test', () => {
    const snapshot = renderer.create(<AboutDev />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});