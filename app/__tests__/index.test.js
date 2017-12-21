import 'react-native';
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';

describe('App', () => {
  let tree, instance;
  beforeEach(() => {
    tree = shallow(<App/>);
    instance = tree.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('onTypeContent: should change the value of content', () => {
    instance.onTypeContent('hello');
    expect(instance.state.content).toBe('hello');
    instance.onTypeContent('');  
    expect(instance.state.content).toBe('');
  });
  it('onTypeTitle: should change the value of title', () => {
    instance.onTypeTitle('test');
    expect(instance.state.title).toBe('test');
    instance.onTypeTitle('');  
    expect(instance.state.title).toBe('');
  });
  it('onSavePress: should add the value of title', () => {
    const newData = {
      title: 'title',
      content: 'content'
    };
    instance.setState(newData);
    instance.onSavePress();
    const expectState = {
      title: '',
      content: '',
      notes: [{
        title: 'title',
        content: 'content'
      }]
    };
    expect(instance.state).toMatchObject(expectState);
  });
});
