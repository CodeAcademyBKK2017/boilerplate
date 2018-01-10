import apiNotes from '../api';
import ConnectApp from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {Alert} from 'react-native';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

jest.mock('../api');
jest.mock('uuid', () => () => 'some uuid');
jest.mock('Alert', () => ({
  alert: jest.fn()
}));

const store = createStore(() => ({}));

describe('App', () => {

  let appComp;
  let instance;

  beforeEach(() => {
    appComp = <ConnectApp store={store}/>;
    const wrapper = shallow(appComp);
    instance = wrapper.find('App').shallow().instance();
  });

  it('renders correctly', () => {
    const tree = renderer.create(appComp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Check state', () => {
    expect(instance.state.titleText).toEqual('');
    expect(instance.state.contentText).toEqual('');
  });

  it('Check Function onContentChange', () => {
    instance.onContentChange('some');
    expect(instance.state.contentText).toEqual('some');
    expect(instance.state.contentText.length).toEqual(4);
  });
  
  it('Check Function onTitleChenge', () => {
    instance.onTitleChange('title');
    expect(instance.state.titleText).toEqual('title');
  });

  it('Check Function showFlatList', () => {
    instance.onTitleChange('React Native');
    instance.onContentChange('- UI');
    instance.onSave();
    expect(instance.showFlatList).toMatchSnapshot();
  }); 

  it('Check Function viewOverlay', () => {
    const note = {
      title: 'React Native',
      content: '- UI'
    };
    instance.onShowModal(note);
    expect(instance.viewOverlay).toMatchSnapshot();
  });

  it('Check Function onShowModal', () => {
    const note = {
      title: 'React Native',
      content: '- UI'
    };
    instance.onShowModal(note);
    expect(instance.state.modalData).toEqual(note);
  });

  it('Check Function onCloseModal', () => {
    instance.onCloseModal();
    expect(instance.state.modalData).toEqual({});
  });

  it('Check Function openAbout with mock', () => { // mock
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    appComp = <ConnectApp store={store}/>;
    const wrapper = shallow(appComp);
    const appWrapper = wrapper.find('App').shallow();
    const appInstance = appWrapper.instance();
    appWrapper.setProps(props);
    appInstance.openAbout();
    expect(appInstance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  it('Check Function openAbout with spy', () => { // spy
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    appComp = <ConnectApp store={store}/>;
    const wrapper = shallow(appComp);
    const appWrapper = wrapper.find('App').shallow();
    const appInstance = appWrapper.instance();
    appWrapper.setProps(props);

    const spyFunc = jest.spyOn(props.navigation, 'navigate');
    appInstance.openAbout();
    expect(spyFunc).toHaveBeenCalledWith('About');
  });

  it('componentDidMount with existed notes', () => {
    jest.spyOn(instance, 'onLoadDataState');
    instance.componentDidMount();    
    expect(instance.onLoadDataState).toBeCalled();
  });

  it('Check Function onSave success', async () => {
    const title = 'React Native';
    const content = '- UI';
    instance.setState({titleText: title, contentText: content});
    await instance.onSave();
    const expectedNote = {
      'title': 'React Native',
      'content': '- UI'
    };
    expect(apiNotes.addNotes).toHaveBeenLastCalledWith(expectedNote);
    expect(instance.state.titleText).toEqual('');
    expect(instance.state.contentText).toEqual('');
  });

  it('Check Function onSave failure', async () => {
    instance.onShowAlert = jest.fn(); // this is mock FN
    apiNotes.addNotes.mockClear();
    apiNotes.addNotes.mockImplementation(() => Promise.reject('API failed'));
    await instance.onSave();
    expect(instance.onShowAlert).toHaveBeenCalledWith('API failed');
  });

  it('Check Function onDelete', async () => {
    const title = 'React Native';
    const content = '- UI';
    const note = {
      content: content,
      id: 1,
      title: title
    };
    instance.setState({titleText: title, contentText: content});
    await instance.onSave();
    await instance.onDelete(note);
    expect(apiNotes.deleteNotes).toBeCalled();
    expect(apiNotes.deleteNotes).toHaveBeenCalledWith(note);
  });

  it('Check Function Delete failure', async () => {
    instance.onShowAlert = jest.fn(); // this is mock FN
    apiNotes.deleteNotes.mockClear();
    apiNotes.deleteNotes.mockImplementation(() => Promise.reject('API failed'));
    await instance.onDelete();
    expect(apiNotes.deleteNotes).toBeCalled();
    expect(instance.onShowAlert).toHaveBeenCalledWith('API failed');
  });

  it('Check Function onShowAlert', () => {
    instance.onShowAlert('err');
    expect(Alert.alert).toBeCalled();
  });

  it('onLoadDataState', async () => { // connect server success !!
    const props = {
      populateNotes: jest.fn()
    };
    appComp = <ConnectApp store={store}/>;
    const wrapper = shallow(appComp);
    const appWrapper = wrapper.find('App').shallow();
    const appInstance = appWrapper.instance();
    appWrapper.setProps(props);
    await appInstance.onLoadDataState();

    expect(apiNotes.getNotes).toBeCalled();
    expect(appInstance.props.populateNotes).toHaveBeenCalledWith([{
      title: 'React Native',
      content: '- UI',
      key: 0,
      id: 1
    }]);
  });
});
