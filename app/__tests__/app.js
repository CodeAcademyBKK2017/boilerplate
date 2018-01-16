import ConnectApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

jest.mock('../api');
jest.mock('uuid', () => () => 'some uuid');
jest.mock('Alert', () => ({
  alert: jest.fn()
}));

const store = createStore(() => ({}));

describe('App', () => {

  let connectedComponent;
  let connectedWrapper;
  let appInstance;
  let appWrapper;

  beforeEach(() => {
    connectedComponent = <ConnectApp store={store}/>;// jsx
    connectedWrapper = shallow(connectedComponent);// wrapper
    appWrapper = connectedWrapper.find('App').shallow();
    appInstance = appWrapper.instance();
  });

  it('renders correctly', () => {
    const tree = renderer.create(connectedComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Check state', () => {
    expect(appInstance.state.titleText).toEqual('');
    expect(appInstance.state.contentText).toEqual('');
  });

  it('Check Function onContentChange', () => {
    appInstance.onContentChange('some');
    expect(appInstance.state.contentText).toEqual('some');
    expect(appInstance.state.contentText.length).toEqual(4);
  });
  
  it('Check Function onTitleChenge', () => {
    appInstance.onTitleChange('title');
    expect(appInstance.state.titleText).toEqual('title');
  });

  it('Check Function showFlatList', () => {
    appInstance.onTitleChange('React Native');
    appInstance.onContentChange('- UI');
    appInstance.onSave();
    expect(appInstance.showFlatList).toMatchSnapshot();
  }); 

  it('Check Function viewOverlay', () => {
    const note = {
      title: 'React Native',
      content: '- UI'
    };
    appInstance.onShowModal(note);
    expect(appInstance.viewOverlay).toMatchSnapshot();
  });

  it('Check Function onShowModal', () => {
    const note = {
      title: 'React Native',
      content: '- UI'
    };
    appInstance.onShowModal(note)();
    expect(appInstance.state.modalData).toEqual(note);
  });

  it('Check Function onCloseModal', () => {
    appInstance.onCloseModal();
    expect(appInstance.state.modalData).toEqual({});
  });

  it('componentDidMount with existed notes', () => {
    const props = {fetchNotes: jest.fn()};
    appWrapper.setProps(props);
    appInstance.componentDidMount();
    expect(appInstance.props.fetchNotes).toBeCalled();
  });
  
  it('Check Function onSave success', () => {
    const props = {
      addNotesRequest: jest.fn()
    };
    const expectedNote = {
      title: 'React Native',
      content: '- UI'
    };
    appWrapper.setProps(props);
    appInstance.setState({titleText: expectedNote.title, contentText: expectedNote.content});
    appInstance.onSave();
    expect(appInstance.props.addNotesRequest).toHaveBeenLastCalledWith(expectedNote);
    expect(appInstance.state.titleText).toEqual('');
    expect(appInstance.state.contentText).toEqual('');
  });
  
  it('Check Function onDelete', () => {
    const props = {
      deleteNotesRequest: jest.fn()
    };
    const note = {
      content: '- UI',
      id: 1,
      title: 'React Native'
    };
    appWrapper.setProps(props);
    appInstance.onDelete(note)();
    expect(appInstance.props.deleteNotesRequest).toHaveBeenCalledWith(note);
  });

  it('Check Function OpenAbout', () => {
    const dispatch = jest.fn();
    const dispatcher = mapDispatchToProps(dispatch);
    dispatcher.navigateToAbout();
    expect(dispatch).toHaveBeenCalledWith({routeName: 'About', type: 'Navigation/NAVIGATE'});
  });
});

