
import ApiNotes from '../api';
import App from '../index';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('{}')),
  setItem: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve('{}'))
}));

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

jest.mock('../api');
jest.mock('uuid', () => () => 'someUUID');

describe('App', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
  });
  it('changeTitle: Should have state Change', () => {
    instance.changeTitle('123');
    expect(instance.state.title).toEqual('123');
  });
  it('changeContent: Should have state Change', () => {
    instance.changeContent('123');
    expect(instance.state.content).toEqual('123');
  });

  it('init should have been call with new note', async () => {
    const storageNote = [
      {
        key: 'some uuid',
        title: 'some title',
        content: 'some message'
      }
    ];
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(storageNote)));
    await instance.init();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('storageNote');
    expect(instance.state.note).toEqual(storageNote);
   
  });
  it('init should have been call with nothing', () => {
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null));
    instance.init();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('storageNote');
  });
  it('goToAbout', () => {
    const navigation = {navigate: jest.fn()};
    wrapper.setProps({navigation: navigation});
    // instance.setProps({navigation: navigation});
    instance.goToAbout();
    expect(instance.props.navigation.navigate).toHaveBeenCalled();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });
  it('goToAbout with spyOn Function', () => {
    const props = {
      navigation: {navigate: jest.fn()}
    };
    wrapper = shallow(<App {...props}/>);
    instance = wrapper.instance();
    const spyFn = jest.spyOn(props.navigation, 'navigate');
    instance.goToAbout();
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('About');
  });

  it('onSave success', async () => {
    const title = 'my test title';
    const content = 'my test message';
    instance.setState({title: title, content: content});

    await instance.onSave();
    const expected = {
      title: '',
      content: '',
      note: [{
        title,
        content,
        key: 'someUUID'
      }]
    };

    const expectedNote = {
      key: 'someUUID',
      title,
      content
    };
    expect(ApiNotes.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('storageNote', JSON.stringify(expected.note));
    expect(instance.state).toEqual(expected);
  });

  it('onSave failure', async () => {
    ApiNotes.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    ApiNotes.addNote.mockImplementation(() => Promise.reject('API failed'));
    await instance.onSave();
    expect(AsyncStorage.setItem).not.toBeCalled();
    expect(Alert.alert).toHaveBeenLastCalledWith(
      'Save Failed',
      'API failed',
      [{text: 'OK'}],
      {cancelable: false});
  });
});
