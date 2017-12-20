import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import Textarea from '../textarea.component';
// import {shallow} from 'enzyme';

describe('Textarea', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Textarea />
    );
    expect(tree).toBeDefined();
  });
  it('Textarea: renders correctly', () => {
    const tree = renderer.create(<Textarea />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
