import Overlay from '../overlay.component';
import React from 'react';
import renderer from 'react-test-renderer';
import  'react-native';

// Note: test renderer must be required after react-native.
// import uuid from 'uuid';

import {shallow} from 'enzyme';

describe('Overlay', () => {
  
  it('renders correctly', () => {
    const tree = renderer.create(
      <Overlay />
    );
    expect(tree).toBeDefined();
  });

  it('Overlay: renders correctly', () => {
    const tree = renderer.create(<Overlay />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
