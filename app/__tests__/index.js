import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });

  it('onTitleChangeText: Should be count the current of string', () => { // example to test class methods
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onTitleChangeText('Title');
    expect(instance.state.currentTitle).toBe('Title');

    instance.onContentChangeText('Content');
    expect(instance.state.currentContent).toBe('Content');

    instance.onSaveButtonPress();
    expect(instance.state.notes).toEqual([{title: 'Title', content: 'Content'}]);
  });
});
