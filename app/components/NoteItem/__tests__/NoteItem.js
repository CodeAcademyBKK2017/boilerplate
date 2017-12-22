import 'react-native';
import NoteItem from '../NoteItem.component';
import React from 'react';

import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Content', () => {
  it('renders correctly', () => {
    const note = {
      key: 'key',
      title: 'title',
      content: 'content'
    };

    const tree = renderer.create(
      <NoteItem data={note} onPressItem={() => {}}/>
    );
    expect(tree).toBeDefined();
  });
});
