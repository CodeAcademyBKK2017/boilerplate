import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../TextArea.component';

describe('TextArea', () => {
    
  it('renders correctly', () => {
    const tree = renderer.create(
      <TextArea />
    );
    expect(tree).toBeDefined();
  });

  it('TextArea: Should return TextArea', () => { // example to test class methods
    const tree = renderer.create(<TextArea />);
    expect(tree).toMatchSnapshot();
  });
});