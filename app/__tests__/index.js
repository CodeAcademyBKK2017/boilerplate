import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('abc')),
  setItem: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve('{}'))
}));

jest.mock('uuid', () => () => 'some uuid');

const notesKey = 'notes';

describe('App', () => {
  let appComp;
  let appInstance;
	
  beforeEach(() => {
    appComp = <App/>;
		
    const wrapper = shallow(appComp);
    appInstance = wrapper.instance();
    AsyncStorage.setItem.mockReset();
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

    appInstance.onChangeTextTitle(title);
    appInstance.onChangeTextContent(content);
    appInstance.onSaveButtonPress();

    const expected = {
      textTitle: '',
      textContent: '',
      notes: [
        {
          key: 'some uuid',
          title,
          content,
          isEven: true
        }
      ]
    };
    expect(appInstance.state).toEqual(expected);
  });

  it('componentDidMount', () => {
    appInstance.componentDidMount();
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve('dfdsjkgfsdhkjgsd'));
    AsyncStorage.getItem(notesKey).then((d) => {
      console.log('d', d);
    });
    expect(AsyncStorage.getItem).toHaveBeenLastCalledWith(notesKey);
    
  });

  it('onDeleteButtonPress', () => {
    const note00 = {
      key: 'some uuid',
      title: 'title 00',
      content: 'content 00',
      isEven: true
    };
    const initialState = {
      textTitle: '',
      textContent: '',
      notes: [note00]
    };
    appInstance.setState(initialState);
    
    const curryFunc = appInstance.onDeleteButtonPress(note00);
    curryFunc();

    const expected = {
      textTitle: '',
      textContent: '',
      notes: []
    };
    expect(appInstance.state).toEqual(expected);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(notesKey, '[]');
  });
});
