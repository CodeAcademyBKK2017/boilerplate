import 'react-native';
import About from '../about.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('About', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <About />
    );
    expect(tree).toBeDefined();
  });
  it('About: renders correctly', () => {
    const tree = renderer.create(<About />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
