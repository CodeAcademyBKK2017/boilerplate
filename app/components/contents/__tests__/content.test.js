import 'react-native';
import Content from '../content.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('Content', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Content />
    );
    expect(tree).toBeDefined();
  });
  it('Content: renders correctly', () => {
    const tree = renderer.create(<Content />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
