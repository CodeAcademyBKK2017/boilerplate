import 'react-native';
import Footer from '../footer.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import {shallow} from 'enzyme';

describe('Footer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Footer />
    );
    expect(tree).toBeDefined();
  });
  it('Footer: renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
