
import App from '../index';
import React from 'react';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.
// import {AsyncStorage} from 'react-native';
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
  it('onDelete Should have Change state', () => {
    const item = {title: 'y', content: 2, key: 2};
    const expectedState = {
      title: '',
      content: '',
      note: [{title: 'x', content: 1, key: 1}]
    };
    instance.setState({
      note: [{title: 'x', content: 1, key: 1}, {title: 'y', content: 2, key: 2}]});

    instance.onDelete(item)();
    expect(instance.state.note).toEqual(expectedState.note);
  });
 
});
