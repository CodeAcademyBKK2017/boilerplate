import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

const store = createStore(() => ({}));

jest.mock('../api');

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
    expect(appInstance.state.content).toEqual('hello');
    appInstance.onTypeContent('');  
    expect(appInstance.state.content).toEqual('');
  });
  it('onTypeTitle: should change the value of title', () => {
    appInstance.onTypeTitle('test');
    expect(appInstance.state.title).toEqual('test');
    appInstance.onTypeTitle('');  
    expect(appInstance.state.title).toEqual('');
  });

  it('onSavePress', async () => {
    const props = {
      addNoteRequest: jest.fn()
    };
    appWrapper.setProps(props);
    const title = 'my test title';
    const content = 'my test content';
    appInstance.setState({title: title, content: content});
    appInstance.onSavePress();
    const expectedNote = {
      'title': 'my test title',
      'content': 'my test content'
    };
    expect(appInstance.props.addNoteRequest).toHaveBeenLastCalledWith(expectedNote);
    expect(appInstance.state.title).toEqual('');
    expect(appInstance.state.content).toEqual('');
  });
 
  it('onDeletePress', async () => {
    const props = {
      deleteNoteRequest: jest.fn()
    };
    appWrapper.setProps(props);
    const item = {
      title: 'title',
      content: 'content'};
    appInstance.onDeletePress(item)();
    expect(appInstance.props.deleteNoteRequest).toHaveBeenLastCalledWith(item);
  });
  
  it('componentDidMount with existed notes', () => {
    const props = {
      fetchNotes: jest.fn()
    };
    appWrapper.setProps(props);
    appInstance.componentDidMount();
    expect(appInstance.props.fetchNotes).toBeCalled();
  });
  
  it('onSavePress: Should be count the current of string', () =>  {
    const props = {
      addNoteRequest: jest.fn()
    };
    const expectedNote = {
      title: 'title',
      content: 'content'
    };
    appWrapper.setProps(props);
    appInstance.setState({title: expectedNote.title, content: expectedNote.content});
    appInstance.onSavePress();
    expect(appInstance.props.addNoteRequest).toHaveBeenLastCalledWith(expectedNote);
    expect(appInstance.state.title).toEqual('');
    expect(appInstance.state.content).toEqual('');
  });
  
  it('On delete item', () => {
    const props = {
      deleteNoteRequest: jest.fn()
    };
    const note = {
      id: 1,
      title: 'title',
      content: 'content'
    };
    appWrapper.setProps(props);
    appInstance.onDeletePress(note)();
    expect(appInstance.props.deleteNoteRequest).toHaveBeenCalledWith(note);
  });

  it('goToAbout', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).goToAbout();
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'AboutApp'}));
  });
});

