import 'react-native';
import NoteItem from '../NoteItem.component';
import React from 'react';

import renderer from 'react-test-renderer';

describe('Content', () => {
  it('renders correctly', () => {
    const note = {
      key: 'key',
      title: 'title',
      content: 'content'
    };

    const tree = renderer.create(<NoteItem data={note} onPressItem={jest.fn} onLongPressItem={jest.fn} />);
    expect(tree).toBeDefined();
  });
});
