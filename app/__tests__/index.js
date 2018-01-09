import ApiNotes from '../api';
import App from '../app';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('../api');
jest.mock('uuid', () => () => '123');
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));
jest.mock('Alert', () => ({
  alert: jest.fn()
}));
describe('App', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<App/>);
    instance = wrapper.instance();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('App: renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
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
      key: '123',
      id: 1
    }];
    const expectedNote = {
      title: 'some',
      content: 'some',
      key: '123'
    };
    instance._onTitleChange('some');
    instance._onContentChange('some');
    await instance._addContent();
    expect(ApiNotes.addNote).toHaveBeenLastCalledWith(expectedNote);
    const spy = jest.spyOn(App, '_setStroage');
    expect(spy).toBeCalled();
    expect(instance.state.arrayContent).toEqual(expectRes);
  }); 

  it('App: addContent Function is will work on fail API', async () => {
   
    ApiNotes.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    await instance._addContent();
    expect(AsyncStorage.setItem).not.toBeCalled();
    expect(Alert.alert).toHaveBeenCalled();
  }); 

  it('App: _removeContent Function is remove ArrayContent by index on success API', async () => {
    const expectedState = [];
    const sendParm = {
      title: 'some',
      content: 'some',
      key: '123',
      id: 1
    };
    instance._onTitleChange('some');
    instance._onContentChange('some');
    await instance._addContent();
    await instance._removeContent(sendParm)();
    expect(Alert.alert).not.toHaveBeenCalled();
    expect(ApiNotes.deleteNote).toHaveBeenLastCalledWith(1);
    expect(instance._setStroage).toHaveBeenCalled();
    expect(instance.state.arrayContent).toEqual(expectedState);
  });

  xit('App: _removeContent Function is remove ArrayContent by index on fail API', async () => {
    ApiNotes.deleteNote.mockClear();
    AsyncStorage.setItem.mockClear();
    await instance._removeContent('123')();
    expect(AsyncStorage.setItem).not.toBeCalled();
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

  xit('App: _setStroage Function must set the state of note', () => {
    const expectedState = [];
    instance._onTitleChange('some');
    instance._onContentChange('some');
    instance._addContent();
    instance._removeContent('123')();
    instance._setStroage();
    expect(instance.state.arrayContent).toEqual(expectedState);
  });

});
