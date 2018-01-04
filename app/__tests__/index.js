import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => '123');
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('App', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('onKeyPressTitle: Success', () => {
    instance.onKeyPressTitle('Title');
    expect(instance.state.titleTextInput).toEqual('Title');
  });
  it('onKeyPressTitle: Failure', () => {
    instance.onKeyPressTitle('Title XXX');
    expect(instance.state.titleTextInput).not.toEqual('Title');
  });
  it('onKeyPressContent: Success', () => {
    instance.onKeyPressContent('123 45');
    expect(instance.state.contentTextInput).toEqual('123 45');
  });
  it('onKeyPressContent: Failure', () => {
    instance.onKeyPressContent('123 45 6');
    expect(instance.state.contentTextInput).not.toEqual('123 45');
  });
  it('onSave: Success', () => {
    const newNoteState = {titleTextInput: 'Title', contentTextInput: 'Content'};
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {title: 'Title', content: 'Content', uuid: '123'}
      ]
    };
    instance.setState(newNoteState);
    instance.onSave();
    expect(instance.state).toMatchObject(expectedState);
  });
  it('onSave: Failure', () => {
    const newNoteState = {titleTextInput: '', contentTextInput: ''};
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {title: 'Title', content: 'Content', uuid: '123'}
      ]
    };
    instance.setState(newNoteState);
    instance.onSave();
    expect(instance.state).not.toMatchObject(expectedState);
  });
  it('onDeleteNote: Success', () => {
    const initState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: [
        {title: 'Title', content: 'Content', uuid: '123'}
      ]
    };
    const expectedState = {
      titleTextInput: '',
      contentTextInput: '',
      notes: []
    };
    const itemToDelete = {title: 'Title', content: 'Content', uuid: '123'};
    instance.setState(initState);
    instance.onDeleteNote(itemToDelete)();
    expect(instance.state).toMatchObject(expectedState);
  });
  it('navigateTo (mock)', () => {
    instance.props.navigation.navigate = jest.fn();
    instance.navigateTo('About')();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });
  it('navigateTo (spy)', () => {
    const spyFunc = jest.spyOn(instance.props.navigation, 'navigate');
    instance.navigateTo('About')();
    expect(spyFunc).toHaveBeenCalledWith('About');
  });
});