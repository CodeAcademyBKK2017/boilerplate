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

  it('renderItem', () => {
    const item = {
      title: 'test title',
      content: 'test content'
    };

    const wrapper = shallow(<NoteList />);
    const instance = wrapper.instance();
    const snapshot = instance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });
});
