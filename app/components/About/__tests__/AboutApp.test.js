
import React from 'react';
import 'react-native';
import AboutApp from '../AboutApp.component';
import renderer from 'react-test-renderer';

describe('AboutApp', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<AboutApp />);
    expect(snapshot).toMatchSnapshot();
  });
});