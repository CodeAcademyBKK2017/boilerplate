import NoteList from '../NoteList.component';
import React from 'react';

import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import 'react-native';

describe('NoteList', () => {
  let noteListComp;
  let noteListInstance;
	
  beforeEach(() => {
    noteListComp = <NoteList/>;
		
    const wrapper = shallow(noteListComp);
    noteListInstance = wrapper.instance();
  });

  it('renders correctly', () => {
    const snapshot = renderer.create(noteListComp).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('renderItem', () => {
    const item = {
      title: 'test title',
      content: 'test content'
    };

    const snapshot = noteListInstance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });

  it('onOpenOverlay', () => {
    const item = {
      title: 'test title',
      content: 'test content'
    };

    const curryFunc = noteListInstance.onOpenOverlay(item);
    curryFunc();

    const expected = {
      modalVisible: true,
      selectedNoteItem: item
    };
    expect(noteListInstance.state).toEqual(expected);
  });

  it('onCloseOverlay', () => {
    noteListInstance.onCloseOverlay();

    const expected = {
      modalVisible: false,
      selectedNoteItem: {}
    };
    expect(noteListInstance.state).toEqual(expected);
  });

  it('_keyExtractor', () => {
    const result = noteListInstance._keyExtractor({id: '123'});
    expect(result).toEqual('123');
  });
});
