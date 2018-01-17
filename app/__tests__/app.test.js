import ConnectedApp, {mapDisplatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

const store = createStore(() => ({}));

describe('App', () => {
  let connectedAppComp;
  let appWrapper;
  let appInstance;
	
  beforeEach(() => {
    connectedAppComp = <ConnectedApp store={store}/>;
    const wrapper = shallow(connectedAppComp);
    appWrapper = wrapper.find('App').shallow();
    appInstance = appWrapper.instance();
  });

  it('renders correctly', () => {
    const snapshot = renderer.create(connectedAppComp).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly with notes', () => {
    appWrapper.setProps({
      notes: [{
        id: 1,
        title: 'my test title',
        content: 'my test message'
      }]
    });
    const snapshot = renderer.create(connectedAppComp).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('onChangeTextTitle', () => {
    const text = 'my test title';
    appInstance.onChangeTextTitle(text);
    expect(appInstance.state.textTitle).toBe(text);
  });

  it('onChangeTextContent', () => {
    const text = 'my test content';
    appInstance.onChangeTextContent(text);
    expect(appInstance.state.textContent).toBe(text);
  });

  it('onSaveButtonPress', () => {
    const title = 'my test title';
    const content = 'my test message';
    appInstance.setState({
      textTitle: title,
      textContent: content
    });
    const props = {
      addNoteRequest: jest.fn()
    };
    appWrapper.setProps(props);
    appInstance.onSaveButtonPress();
    const note = {
      title,
      content
    };
    expect(appInstance.props.addNoteRequest).toHaveBeenCalledWith(note);
  });

  it('onDeleteButtonPress', () => {
    const props = {
      deleteNoteRequest: jest.fn()
    };
    appWrapper.setProps(props);
    const note = {
      id: 1,
      title: 'my test title',
      content: 'my test message'
    };
    const deleteButtonPressHandler = appInstance.onDeleteButtonPress(note);
    deleteButtonPressHandler();
    expect(appInstance.props.deleteNoteRequest).toHaveBeenCalledWith(note.id);
  });

  it('componentDidMount', () => {
    const props = {
      fetchNotes: jest.fn()
    };
    appWrapper.setProps(props);
    appInstance.componentDidMount();
    expect(appInstance.props.fetchNotes).toBeCalled();
  });

  it('onAboutButtonPress with mock', () => {
    const dispatch = jest.fn();
    const props = mapDisplatchToProps(dispatch);
    props.navigateToAbout();
    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });
});