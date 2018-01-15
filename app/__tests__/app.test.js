import ConnectedApp, {mapDisplatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

// constant
const store = createStore(() => ({}));

// test case
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
  
  // ----------

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
    // prepare
    const title = 'my test title';
    const content = 'my test message';
    appInstance.setState({
      textTitle: title,
      textContent: content
    });
    
    const props = {
      saveNote: jest.fn()
    };
    appWrapper.setProps(props);

    // execute
    appInstance.onSaveButtonPress();

    // expect
    const note = {
      title,
      content
    };
    expect(appInstance.props.saveNote).toHaveBeenCalledWith(note);
  });

  it('onDeleteButtonPress', () => {
    // prepare
    const props = {
      deleteRequestNote: jest.fn()
    };
    appWrapper.setProps(props);
    
    // execute
    const note = {
      id: 1,
      title: 'my test title',
      content: 'my test message'
    };
    const deleteButtonPressHandler = appInstance.onDeleteButtonPress(note);
    deleteButtonPressHandler();

    // expect
    expect(appInstance.props.deleteRequestNote).toHaveBeenCalledWith(note.id);
  });

  it('componentDidMount', () => {
    // prepare
    const props = {
      fetchNotes: jest.fn()
    };
    appWrapper.setProps(props);

    // execute
    appInstance.componentDidMount();
    
    // expect
    expect(appInstance.props.fetchNotes).toBeCalled();
  });

  it('onAboutButtonPress with mock', () => {
    const dispatch = jest.fn();
    const props = mapDisplatchToProps(dispatch);
    
    props.navigateToAbout();

    expect(dispatch).toHaveBeenCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });
});
