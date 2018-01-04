import 'react-native';
import AboutDev from '../components/About/AboutDev.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('AboutDev', () => {
  it('renders correctly AboutDev', () => {
    const tree = renderer.create(
      <AboutDev />
    );
    expect(tree).toMatchSnapshot();
  });
});