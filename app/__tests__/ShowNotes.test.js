import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import ShowNotes from '../components/ShowNotes/ShowNotes.component';
import {shallow} from 'enzyme';

describe('ShowNotes', () => {
  it('renders correctly ShowNotes', () => {
    const tree = renderer.create(
      <ShowNotes />
    );
    expect(tree).toMatchSnapshot();
  });

  it('ShowNotes _keyExtractor', () => {
    const wrapper = shallow(<ShowNotes/>);
    const instance = wrapper.instance();
    const result = instance._keyExtractor({title: 't1', content: 'c1', uuid: '1'});
    expect(result).toEqual('1');
  });

  it('ShowNotes _renderItem', () => {
    const wrapper = shallow(<ShowNotes/>);
    const instance = wrapper.instance();
    const item = {title: 't1', content: 'c1', uuid: '1'};
    const result = instance._renderItem({item});
    expect(result).toMatchSnapshot();
  });
});
