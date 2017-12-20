import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../TextArea.component';

describe('TextArea', () => {
  it('snapshot test', () => {
    const snapshot = renderer.create(<TextArea />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});