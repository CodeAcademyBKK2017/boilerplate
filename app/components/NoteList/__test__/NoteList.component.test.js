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
  xit('onShowModal', () => {
    const wrapper = shallow(<NoteList/>);
    appInstance = wrapper.appInstance();
    const item = {title: 'title', content: 'content'};
    const expectState = {
      showModal: true, title: 'title', content: 'content'
    };
    appInstance.onShowModal(item)();
    expect(appInstance.state).toMatchObject(expectState);
  });
  xit('onCloseModal', () => {
    const wrapper = shallow(<NoteList/>);
    appInstance = wrapper.appInstance();
    appInstance.onCloseModal();
    expect(appInstance.state.showModal).toBe(false);
  });
});