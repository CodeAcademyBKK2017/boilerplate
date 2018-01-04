
import React from 'react';
import 'react-native';
import AboutDevs from '../AboutDevs.component';
import renderer from 'react-test-renderer';

describe('AboutDevs', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<AboutDevs />);
    expect(snapshot).toMatchSnapshot();
  });
});