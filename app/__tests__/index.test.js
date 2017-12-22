import 'react-native';
import App from '../index';
import NoteList from '../components/NoteList/NoteList.component';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => 'someId');

describe('App', () => {
  let tree, instance;
  beforeEach(() => {
    tree = shallow(<App/>);
    instance = tree.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('rendersItem correctly', () => {
    const wrapper = shallow(<NoteList/>);
    instance = wrapper.instance();
    const item = {title: 'title', content: 'content', uuid: '1'};
    const snapshot = instance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });
  it('onTypeContent: should change the value of content', () => {
    instance.onTypeContent('hello');
    expect(instance.state.content).toBe('hello');
    instance.onTypeContent('');  
    expect(instance.state.content).toBe('');
  });
  it('onTypeTitle: should change the value of title', () => {
    instance.onTypeTitle('test');
    expect(instance.state.title).toBe('test');
    instance.onTypeTitle('');  
    expect(instance.state.title).toBe('');
  });
  it('onSavePress: should add the value of title', () => {
    const newData = {
      title: 'title',
      content: 'content'
    };
    instance.setState(newData);
    instance.onSavePress();
    const expectState = {
      title: '',
      content: '',
      notes: [{
        title: 'title',
        content: 'content',
        key: 'someId'
      }]
    };
    expect(instance.state).toEqual(expectState);
  });
  it('onShowModal', () => {
    const wrapper = shallow(<NoteList/>);
    instance = wrapper.instance();
    const item = {title: 'title', content: 'content'};
    const expectState = {
      showModal: true, title: 'title', content: 'content'
    };
    instance.onShowModal(item)();
    expect(instance.state).toMatchObject(expectState);
  });
  it('onCloseModal', () => {
    const wrapper = shallow(<NoteList/>);
    instance = wrapper.instance();
    instance.onCloseModal();
    expect(instance.state.showModal).toBe(false);
  });
});
