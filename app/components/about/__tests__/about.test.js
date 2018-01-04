import 'react-native';
import AboutApp from '../aboutApp.component';
import AboutDev from '../aboutDev.vomponent';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('About', () => {
  it('AboutApp renders correctly', () => {
    const tree = renderer.create(
      <AboutApp />
    );
    expect(tree).toBeDefined();
  });
  it('AboutApp: renders correctly', () => {
    const tree = renderer.create(<AboutApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('AboutDev renders correctly', () => {
    const tree = renderer.create(
      <AboutDev />
    );
    expect(tree).toBeDefined();
  });
  it('AboutDev: renders correctly', () => {
    const tree = renderer.create(<AboutDev />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
