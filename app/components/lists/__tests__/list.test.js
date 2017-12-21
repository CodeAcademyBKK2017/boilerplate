import 'react-native';
import List from '../list.component';
import React from 'react';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
// import uuid from 'uuid';

import {shallow} from 'enzyme';

describe('List', () => {
  
  it('renders correctly', () => {
    const tree = renderer.create(
      <List />
    );
    expect(tree).toBeDefined();
  });

  it('List: renders correctly', () => {
    const tree = renderer.create(<List />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('List: _renderItems Function is will work', () => {
    const wrapper = shallow(<List/>);
    const instance = wrapper.instance();
    const param = {item: {title: 'test', content: 'test1', key: ''}};
    const tree = instance._renderItems(param);
    expect(tree).toMatchSnapshot();
  });

  it('List: _showPopup Function is will work', () => {
    const wrapper = shallow(<List/>);
    const instance = wrapper.instance();
    const param = {item: {title: 'test', content: 'test1', key: ''}};
    const tree = instance._showPopup(param);
    expect(tree).toMatchSnapshot();
  });
});
