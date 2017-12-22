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
      <NoteItem data={note}/>
    );
    expect(tree).toBeDefined();
  });

  it('onPress choose have been called', () => {
    const props = {
      data: {
        key: 'key',
        title: 'title',
        content: 'content'
      },
      onPressItem: jest.fn()
    };

    const wrapper = shallow(<NoteItem {...props}/>);
    const instance = wrapper.instance();
    instance._onPress();
    expect(instance.props.onPressItem).toBeCalled();
  });
});
