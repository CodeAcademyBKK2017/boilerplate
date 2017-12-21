import React from 'react';
import 'react-native';
import NoteList from '../NoteList.component';
import renderer from 'react-test-renderer';

describe('NoteList', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<NoteList />);
    expect(snapshot).toMatchSnapshot();
  });
});