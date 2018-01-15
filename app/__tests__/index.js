import ApiNotes from '../api';
import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

jest.mock('../api');
jest.mock('uuid', () => () => '123');
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('Alert', () => ({
  alert: jest.fn()
}));
// jest.mock('dispatch', () => jest.fn());
describe('ConnectedApp', () => {
  let wrapper, instance;

  beforeEach(() => {
    const store = createStore(() => ({}));
    const appComp = <ConnectedApp store={store}/>;
    wrapper = shallow(appComp).find('App').shallow();
    instance = wrapper.instance();
    ApiNotes.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    Alert.alert.mockClear();
  });

  it('App: renders correctly', () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('App: onContentChange Function is change the currentContent state ', () => {
    expect(instance.state.currentContent).toEqual('');
    instance._onContentChange('some');
    expect(instance.state.currentContent).toEqual('some');
  });

  it('App: onTitleChange Function is change the currentTitle state ', () => {
    expect(instance.state.currentTitle).toEqual('');
    instance._onTitleChange('some');
    expect(instance.state.currentTitle).toEqual('some');
  });

  it('App: _addContent Function is will work on success API', async () => {
    const expectRes = {
      title: 'some',
      content: 'some'
    };

    const expectedNote = {
      currentContent: '', 
      currentTitle: ''
    };

    instance._onTitleChange('some');
    instance._onContentChange('some');
    wrapper.setProps({addNoteToSaga: jest.fn()});
    await instance._addContent();
    expect(instance.props.addNoteToSaga).toHaveBeenLastCalledWith(expectRes);
    expect(instance.state).toEqual(expectedNote);
  }); 

  it('App: _addContent Function is will work on fail API', async () => {
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    await instance._addContent();
    expect(ApiNotes.addNote).not.toBeCalled();
    expect(Alert.alert).toHaveBeenCalled();
  }); 

  it('App: _removeContent Function is remove ArrayContent by index on success API', async () => {
    const sendParm = {
      title: 'some',
      content: 'some',
      id: 1
    };
    wrapper.setState({currentContent: 'some', currentTitle: 'some'});
    wrapper.setProps({deleteNoteToSaga: jest.fn()});
    await instance._addContent();
    await instance._removeContent(sendParm)();
    expect(instance.props.deleteNoteToSaga).toHaveBeenLastCalledWith(1);
  });

  it('App: _removeContent Function is remove ArrayContent by index on fail API', async () => {
    ApiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    await instance._removeContent()();
    expect(Alert.alert).toHaveBeenCalled();
  }); 

  it('App: gotoAbout Function must have to called', () => {
    const result = {routeName: 'About', type: 'Navigation/NAVIGATE'};
    const dispatch = jest.fn();
    const dispatcher = mapDispatchToProps(dispatch);
    dispatcher.gotoAbout();
    expect(dispatch).toHaveBeenCalledWith(result);
  });

  it('App: AddData Function must have to called', () => {
    const result = {type: 'ADD_NOTE_REQUEST'};
    const dispatch = jest.fn();
    const dispatcher = mapDispatchToProps(dispatch);
    dispatcher.addNoteToSaga();
    expect(dispatch).toHaveBeenCalledWith(result);
  });

});
