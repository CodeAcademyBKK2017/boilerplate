import 'react-native';
import AboutApp from '../AboutApp.component';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AboutApp', () => {
  it('snapshot test', () => {
    const snapshot = renderer.create(<AboutApp />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});