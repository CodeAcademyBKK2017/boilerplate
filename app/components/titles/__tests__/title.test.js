import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import Title from '../title.component';
// import {shallow} from 'enzyme';

describe('Title', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Title />
    );
    expect(tree).toBeDefined();
  });
  it('Title: renders correctly', () => {
    const tree = renderer.create(<Title />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
