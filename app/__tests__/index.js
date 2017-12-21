import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('onKeyPressTitle: Success', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onKeyPressTitle('Title');
    expect(instance.state.titleTextInput).toEqual('Title');
  });
  it('onKeyPressTitle: Failure', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onKeyPressTitle('Title XXX');
    expect(instance.state.titleTextInput).not.toEqual('Title');
  });
  it('onKeyPressContent: Success', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onKeyPressContent('123 45');
    expect(instance.state.contentTextInput).toEqual('123 45');
  });
  it('onKeyPressContent: Failure', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onKeyPressContent('123 45 6');
    expect(instance.state.contentTextInput).not.toEqual('123 45');
  });
  it('onSave: Success', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const newNoteState = {titleTextInput: 'Title', contentTextInput: 'Content'};
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {title: 'Title', content: 'Content'}
      ]
    };
    instance.setState(newNoteState);
    instance.onSave();
    expect(instance.state).toMatchObject(expectedState);
  });
  it('onSave: Failure', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const newNoteState = {titleTextInput: '', contentTextInput: ''};
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {title: 'Title', content: 'Content'}
      ]
    };
    instance.setState(newNoteState);
    instance.onSave();
    expect(instance.state).not.toMatchObject(expectedState);
  });
});