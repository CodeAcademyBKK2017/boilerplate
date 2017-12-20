import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import Title from '../components/Title/Title.component';
// import {shallow} from 'enzyme';

describe('Title', () => {
  it('renders correctly Title', () => {
    const tree = renderer.create(
      <Title />
    );
    expect(tree).toBeDefined();
  });
});
