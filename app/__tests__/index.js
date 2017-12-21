import 'react-native';
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => 'some uuid');

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });

  it('onChangeTextTitle', () => {
    const text = 'my test title';

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.onChangeTextTitle(text);

    expect(instance.state.textTitle).toBe(text);
  });

  it('onChangeTextContent', () => {
    const text = 'my test content';

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.onChangeTextContent(text);

    expect(instance.state.textContent).toBe(text);
  });

  it('onSaveButtonPress', () => {
    const title = 'my test title';
    const content = 'my test message';

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.onChangeTextTitle(title);
    instance.onChangeTextContent(content);
    instance.onSaveButtonPress();

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
    expect(instance.state).toEqual(expected);
  });
});
