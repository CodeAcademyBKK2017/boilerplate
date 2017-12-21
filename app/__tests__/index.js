import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => 'someUUID');

describe('App', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
  });
  it('changeTitle: Should have state Change', () => {
    instance.changeTitle('123');
    expect(instance.state.title).toEqual('123');
  });
  it('changeContent: Should have state Change', () => {
    instance.changeContent('123');
    expect(instance.state.content).toEqual('123');
  });
  it('onSave: Should have state Change', () => {
    instance.setState({title: 'someTitle', content: 'someContent'});
    instance.onSave();
    expect(instance.state.note).toEqual([{title: 'someTitle', content: 'someContent', key: 'someUUID'}]);
    instance.setState({title: 'abc', content: 'def'});
    instance.onSave();
    expect(instance.state.note).toEqual([
      {title: 'someTitle', content: 'someContent', key: 'someUUID'},
      {title: 'abc', content: 'def', key: 'someUUID'}
    ]);
  });
});
