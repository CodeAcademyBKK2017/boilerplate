import 'react-native';
import AboutApp from '../components/About/AboutApp.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('AboutApp', () => {
  it('renders correctly AboutApp', () => {
    const tree = renderer.create(
      <AboutApp />
    );
    expect(tree).toMatchSnapshot();
  });
});