import ApiNotes from '../api';
import ConnectedApp, {mapDispatchToProps}  from '../app';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {getItemToStorage, setItemToStorage} from '../utils/storageutil';
import {shallow} from 'enzyme';

const store = createStore(() => ({}));

jest.mock('Alert', () => ({
  alert: jest.fn()
}));
jest.mock('../api');
jest.mock('../utils/storageutil');

describe('App', () => {
  let wrapper, instance, appComp;
  beforeEach(() => {
    appComp = <ConnectedApp store={store}/>;
    wrapper = shallow(appComp).find('App').shallow();
    instance = wrapper.instance();
    ApiNotes.addNote.mockClear();
    ApiNotes.deleteNote.mockClear();
    ApiNotes.getNotes.mockClear();
    setItemToStorage.mockClear();
    getItemToStorage.mockClear();
  });
  it('renders correctly with empty store', () => {
    const tree = renderer.create(appComp);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with data store', () => {
    const notes = [{content: 1, title: 2}];
    wrapper.setProps({noteList: notes});
    const tree = renderer.create(appComp);
    expect(tree).toMatchSnapshot();
  });
  it('changeTitle: Should have state Change', () => {
    instance.changeTitle('123');
    expect(instance.state.title).toEqual('123');
  });
  it('changeContent: Should have state Change', () => {
    instance.changeContent('123');
    expect(instance.state.content).toEqual('123');
  });
  it('goToAbout', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.goToAbout();
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenLastCalledWith({'routeName': 'About', 'type': 'Navigation/NAVIGATE'});
  });
  it('onSave ', () => {
    const addNoteRequest = jest.fn();
    wrapper.setProps({addNoteRequest});
    const note =   {
      title: '123',
      content: '456'
    };
    const initialstate = {'content': '', 'title': ''};
    instance.setState(note);
    instance.onSave();

    expect(instance.props.addNoteRequest).toHaveBeenLastCalledWith(note);
    expect(instance.state).toEqual(initialstate);
  });
  it('onDelete ',  () => {
    const deleteNoteRequest = jest.fn();
    wrapper.setProps({deleteNoteRequest});
    const item = {id: 1};
    const curryFn = instance.onDelete(item);
    curryFn();
    expect(instance.props.deleteNoteRequest).toHaveBeenLastCalledWith(1);
  });

});
