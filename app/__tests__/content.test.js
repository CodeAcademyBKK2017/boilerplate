import 'react-native';
import Content from '../components/Content/Content.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('Content', () => {
  it('renders correctly Content', () => {
    const tree = renderer.create(
      <Content />
    );
    expect(tree).toBeDefined();
  });
});
