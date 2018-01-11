import ApiNotes from '../api';
import ConnectedApp from '../app';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Util from '../util/utility';
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

  it('App: addContent Function is will work on success API', async () => {
    const expectRes = [{
      title: 'some',
      content: 'some',
      id: 1
    }];
    const expectedNote = {
      title: 'some',
      content: 'some'
    };
    instance._onTitleChange('some');
    instance._onContentChange('some');
    wrapper.setProps({addNoteToReducer: jest.fn()});
    await instance._addContent();
    expect(ApiNotes.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(instance.props.addNoteToReducer).toHaveBeenLastCalledWith(expectRes);
  }); 

  it('App: addContent Function is will work on fail API', async () => {
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
    wrapper.setProps({deleteNoteFromReducer: jest.fn()});
    await instance._addContent();
    await instance._removeContent(sendParm)();
    expect(ApiNotes.deleteNote).toHaveBeenLastCalledWith(1);
    expect(instance.props.deleteNoteFromReducer).toHaveBeenLastCalledWith(1);
  });

  it('App: _removeContent Function is remove ArrayContent by index on fail API', async () => {
    ApiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    await instance._removeContent()();
    expect(Alert.alert).toHaveBeenCalled();
  }); 

  it('App: _gotoAbout Function must have to called', () => {
    wrapper.setProps({navigation: {
      navigate: jest.fn()
    }});
    instance._gotoAbout();
    expect(instance.props.navigation.navigate).toHaveBeenCalled();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  it('App: _setStroage Function must get data from store state and success try', async () => {
    const sendParm = [{
      title: 'some',
      content: 'some',
      id: 1
    }];
    wrapper.setState({currentContent: 'some', currentTitle: 'some'});
    wrapper.setProps({populateFromReducer: jest.fn()});
    await instance._addContent();
    await instance._removeContent(sendParm)();
    await instance._setStroage();
    expect(instance.props.populateFromReducer).toHaveBeenLastCalledWith(sendParm);
  });

  it('App: _setStroage Function must fail api but try to populate from stroage and not have a data', async () => {
    const sendParm = [{
      title: 'some',
      content: 'some',
      id: 1
    }];
    ApiNotes.getNotes.mockImplementation(() => Promise.reject('API failed'));
    wrapper.setProps({populateFromReducer: jest.fn()});
    await instance._addContent();
    await instance._removeContent(sendParm)();
    await instance._setStroage();
    expect(instance.props.populateFromReducer).toHaveBeenLastCalledWith(null);
  });

});
