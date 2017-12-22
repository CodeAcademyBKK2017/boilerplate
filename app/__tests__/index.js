import 'react-native';
import App from '../index';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => '123');
describe('App', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<App/>);
    instance = wrapper.instance();
  });

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
  it('App: onContentChange Function is change the currentContent state ', () => {
    expect(instance.state.currentContent).toEqual('');
    instance._onContentChange('some');
    expect(instance.state.currentContent).toEqual('some');
  });

  it('App: onTitleChange Function is change the currentTitle state ', () => {
    expect(instance.state.currentTitle).toEqual('');
    instance._onTitleChange('some');
    expect(instance.state.currentTitle).toEqual('some');
  });

  it('App: addContent Function is will work', () => {
    const expectRes =  {
      currentContent: '',
      currentTitle: '',
      arrayContent: [{
        title: 'some',
        content: 'some',
        key: '123'
      }]
    };
    instance._onTitleChange('some');
    instance._onContentChange('some');
    instance._addContent();
    expect(instance.state).toEqual(expectRes);
  }); 

  it('App: _removeContent Function is remove ArrayContent by key ', () => {
    const expectedState = [];
    instance._onTitleChange('some');
    instance._onContentChange('some');
    instance._addContent();
    instance._removeContent('123')();
    expect(instance.state.arrayContent).toEqual(expectedState);
  });
});
