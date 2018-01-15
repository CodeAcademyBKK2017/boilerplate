import ConnectedApp, {mapDispatchToProps} from '../app';
import React from 'react';
import renderer from 'react-test-renderer';
import storageutil from '../utils/storageutil';

// Note: test renderer must be required after react-native.
import {createStore} from 'redux';
import {NavigationActions} from 'react-navigation';
import {shallow} from 'enzyme';

const store = createStore(() => ({notes: []}));
jest.mock('uuid', () => () => 'some uuid');

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

jest.mock('../utils/storageutil', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('../api', () => ({
  onGetNote: jest.fn(() => Promise.resolve([])),
  onAddNote: jest.fn(() => Promise.resolve({title: 'mock', content: 'mock', id: 1})),
  onDelete: jest.fn(() => Promise.resolve())
}));

// constant
// const notesKey = 'notes';

// test case
describe('App', () => {
  let appComp;
  let appInstance;
  let appWrapper;
	
  beforeEach(() => {
    appComp = <ConnectedApp  store={store}/>;
		
    const wrapper = shallow(appComp);
    appWrapper = wrapper.find('App').shallow();
    appInstance = appWrapper.instance();
    
    storageutil.setItem.mockClear();
  });
  
  // ----------

  it('renders correctly', () => {
    const snapshot = renderer.create(appComp).toJSON();
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
    appInstance.setState({textTitle: title, textContent: content});

    const props = {
      saveHandler: jest.fn()
    };

    appWrapper.setProps(props);

    appInstance.onSaveButtonPress();

    const expectedNote = {
      'content': 'my test message',
      'title': 'my test title'
    };
    
    expect(props.saveHandler).toHaveBeenLastCalledWith(expectedNote);

  });

  it('onDeleteButtonPress', () => {
    const note00 = {
      id: 1,
      title: 'title 00',
      content: 'content 00'
    };
    
    const props = {
      notes: [note00],
      deleHandler: jest.fn()
    };

    appWrapper.setProps(props);
    
    const delFunc = appInstance.onDeleteButtonPress(note00);
    delFunc();
    
    expect(props.deleHandler).toHaveBeenLastCalledWith(note00);
  });

  it('onShowAboutUs', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.showAboutUs();
    expect(dispatch).toHaveBeenLastCalledWith(NavigationActions.navigate({routeName: 'About'}));
  });

  it('componentDidMount with existed notes', () => {
    const props = {
      fetchNote: jest.fn()
    };
    appWrapper.setProps(props);
    appInstance.componentDidMount();

    expect(props.fetchNote).toHaveBeenCalledWith();
  });
  
});
