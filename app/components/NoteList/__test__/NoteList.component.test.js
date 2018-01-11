import NoteList from '../NoteList.component';
import React from 'react';
import {shallow} from 'enzyme';

describe('App', () => {
  let appComp;
  let appInstance;
  beforeEach(() => {
    appComp = <NoteList/>;
    const wrapper = shallow(appComp);
    appInstance = wrapper.instance();
  });
  it('rendersItem correctly', () => {
    const item = {item: {title: 'title', content: 'content'}};
    const snapshot = appInstance.renderItem(item);
    expect(snapshot).toMatchSnapshot();
  });
  it('onShowModal', () => {
    const item = {title: 'title', content: 'content'};
    const expectState = {
      showModal: true, title: 'title', content: 'content'
    };
    appInstance.onShowModal(item)();
    expect(appInstance.state).toMatchObject(expectState);
  });
  it('onCloseModal', () => {
    appInstance.onCloseModal();
    expect(appInstance.state.showModal).toBe(false);
  });
  it('keyExtractor', () => {
    const item = {id: 1};
    expect(appInstance.keyExtractor(item)).toEqual(1);
  });
});