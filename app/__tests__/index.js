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
  it('App: renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('App: onContentChange Function is will work', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    expect(instance.state.currentContent).toEqual('');
    instance.onContentChange('some');
    expect(instance.state.currentContent).toEqual('some');
  });

  it('App: onTitleChange Function is will work', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    expect(instance.state.currentTitle).toEqual('');
    instance.onTitleChange('some');
    expect(instance.state.currentTitle).toEqual('some');
  });

  it('App: addContent Function is will work', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    const expectRes =  {
      currentContent: '',
      currentTitle: '',
      arrayContent: [{
        title: 'some',
        content: 'some'
      }]
    };
    instance.onTitleChange('some');
    instance.onContentChange('some');
    instance.addContent();
    expect(instance.state).toEqual(expectRes);
  }); 
});
