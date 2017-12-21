import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('App', () => {

  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
  });

  it('getName: Should return Yo', () => {
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('Check state', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    expect(instance.state.titleText).toEqual('');
    expect(instance.state.contentText).toEqual('');
  });

  it('Check Function onContentChange', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onContentChange('some');
    expect(instance.state.contentText).toEqual('some');
    expect(instance.state.contentText.length).toEqual(4);
  });
  
  it('Check Function onTitleChenge', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.onTitleChange('title');
    expect(instance.state.titleText).toEqual('title');
  });

  it('Check Function onSave', () => {
    const props = {};
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    const expectRes = {
      titleText: '',
      contentText: '',
      NOTES: [{
        title: 'React Native',
        content: '- UI'
      }]
    };
    instance.onTitleChange('React Native');
    instance.onContentChange('- UI');
    instance.onSave();
    expect(instance.state).toEqual(expectRes);
  });
});
