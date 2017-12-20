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
  it('App: Logger Function is will work', () => {
    const wrapper = shallow(<App/>);
    const instance = wrapper.instance();
    expect(instance.state.text).toEqual('');
    instance.Logger('some');
    expect(instance.state.text).toEqual('some');
  });
  
});
