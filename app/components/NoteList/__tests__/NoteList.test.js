import React from 'react';
import 'react-native';
import NoteList from '../NoteList.component';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('NoteList', () => {
  let wrapper, instance, notes;
  beforeEach(() => {
    wrapper = shallow(<NoteList />);
    instance = wrapper.instance();
    notes = [
      {title: 'Title', content: 'Content', uuid: '1'},
      {title: 'Title 2', content: 'Content 2', uuid: '2'},
      {title: 'Title 3', content: 'Content 3', uuid: '3'}
    ];
  });
  it('renders correctly', () => {
    const snapshot = renderer.create(<NoteList notes={notes} />);
    expect(snapshot).toMatchSnapshot();
  });
  it('keyExtractor', () => {
    const value = instance.keyExtractor({title: 'Title', content: 'Content', uuid: '1'});
    expect(value).toEqual('1');
  });
  it('renderItem', () => {
    const item = {title: 'Title', content: 'Content', uuid: '1'};
    const snapshot = instance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });
  it('showModal', () => {
    const item = {title: 'Title', content: 'Content'};
    const expectedState = {modalVisible: true, modalTitle: 'Title', modalContent: 'Content'};
    instance.showModal(item)();
    expect(instance.state).toMatchObject(expectedState);
  });
  it('onModalClose', () => {
    instance.onModalClose();
    expect(instance.state.modalVisible).toBe(false);
  });
});