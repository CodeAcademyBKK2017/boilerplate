import 'react-native';
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => 'some uuid');

describe('App', () => {
  let appComp;
  let appInstance;
	
  beforeEach(() => {
    appComp = <App/>;
		
    const wrapper = shallow(appComp);
    appInstance = wrapper.instance();
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
});
