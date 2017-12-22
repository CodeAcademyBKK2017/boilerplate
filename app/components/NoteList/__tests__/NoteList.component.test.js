import NoteList from '../NoteList.component';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import 'react-native';

describe('NoteList', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<NoteList />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('renderItem with even', () => {
    const item = {
      title: 'test title',
      content: 'test content',
      isEven: true
    };

    const wrapper = shallow(<NoteList />);
    const instance = wrapper.instance();
    const snapshot = instance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });

  it('renderItem with odd', () => {
    const item = {
      title: 'test title',
      content: 'test content',
      isEven: false
    };

    const wrapper = shallow(<NoteList />);
    const instance = wrapper.instance();
    const snapshot = instance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });

  it('onOpenOverlay', () => {
    const item = {
      title: 'test title',
      content: 'test content',
      isEven: true
    };

    const wrapper = shallow(<NoteList />);
    const instance = wrapper.instance();
    const curryFunc = instance.onOpenOverlay(item);
    curryFunc();
    
    const expected = {
      modalVisible: true,
      selectedNoteItem: item
    };
    expect(instance.state).toEqual(expected);
  });

  it('onCloseOverlay', () => {
    const wrapper = shallow(<NoteList />);
    const instance = wrapper.instance();
    instance.onCloseOverlay();

    const expected = {
      modalVisible: false,
      selectedNoteItem: {}
    };
    expect(instance.state).toEqual(expected);
  });
});
