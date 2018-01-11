import Api from '../api';
import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {Alert} from 'react-native';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

const store = createStore(() => ({}));

jest.mock('../api');
jest.mock('Alert', () => ({
  alert: jest.fn()
}));

describe('App', () => {
  let appComp;
  let appInstance;
  let appWrapper;
  beforeEach(() => {
    appComp = <ConnectedApp store={store}/>;
    appWrapper = shallow(appComp).find('App').shallow();
    appInstance = appWrapper.instance();
    const props = {
      showNote: jest.fn()
    };
    appWrapper.setProps(props);
  });
  it('renders correctly', () => {
    const snapshot = renderer.create(appComp).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  
  it('onTypeContent: should change the value of content', () => {
    appInstance.onTypeContent('hello');
    expect(appInstance.state.content).toBe('hello');
    appInstance.onTypeContent('');  
    expect(appInstance.state.content).toBe('');
  });
  it('onTypeTitle: should change the value of title', () => {
    appInstance.onTypeTitle('test');
    expect(appInstance.state.title).toBe('test');
    appInstance.onTypeTitle('');  
    expect(appInstance.state.title).toBe('');
  });

  it('onSavePress success', async () => {
    const title = 'my test title';
    const content = 'my test content';
    appInstance.setState({title: title, content: content});
    await appInstance.onSavePress();
    const expectedNote = {
      'title': 'my test title',
      'content': 'my test content'
    };
    expect(Api.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(appInstance.state.title).toEqual('');
    expect(appInstance.state.content).toEqual('');
  });

  it('onSavePress failure', async () => {
    Api.addNote.mockClear();
    Api.addNote.mockImplementation(() => Promise.reject('API failed'));
    await appInstance.onSavePress();
    expect(Alert.alert).toBeCalled();
  });
  
  it('onDeletePress success', async () => {
    const item = {
      title: 'title',
      content: 'content'};
    const initialData = {
      title: '',
      content: '',
      notes: [item]
    };
    await appInstance.setState(initialData);
    await appInstance.onDeletePress(item)();
    expect(Api.deleteNote).toHaveBeenLastCalledWith(item);
  });

  it('onDeletePress failure', async () => {
    Api.deleteNote.mockClear();
    Api.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    await appInstance.onDeletePress()();
    expect(Alert.alert).toBeCalled();
  });
 
  it('componentDidMount with existed notes', () => {
    jest.spyOn(appInstance, 'onLoadData');
    appInstance.componentDidMount();
    expect(appInstance.onLoadData).toBeCalled();
  });
  it('onLoadData success', async () => {
    await appInstance.onLoadData();
    expect(Api.getNote).toBeCalled();
    expect(appInstance.props.showNote).toHaveBeenCalledWith([{
      title: 'React Native',
      content: '- UI'
    }]);
  });
  it('onLoadData failure', async () => {
    Api.getNote.mockImplementation(jest.fn(() => Promise.reject('API FAILED')));
    await appInstance.onLoadData();
    expect(appInstance.props.showNote).toHaveBeenCalledWith([]);
  });
  it('goToAbout', () => {
    const dispatch = jest.fn();
    const dispatcher = mapDispatchToProps(dispatch);
    dispatcher.goToAbout();
    expect(dispatch).toHaveBeenCalledWith({routeName: 'About', type: 'Navigation/NAVIGATE'});
  });
});

