import List from '../list.component';
import React from 'react';
import renderer from 'react-test-renderer';
import  'react-native';

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

  it('List: _showPopup Function change state visible to true', () => {

    const wrapper = shallow(<List/>);
    const instance = wrapper.instance();
    const param = {item: {title: 'test', content: 'test1', key: ''}};
    instance._showPopup(param)();
    const ExpectedmodalVisible = true;
    expect(instance.state.modalVisible).toEqual(ExpectedmodalVisible);
    expect(instance.state.currentItem).toEqual(param);
  
  });
  it('List: _closeModal Function change state visible to false', () => {
    const wrapper = shallow(<List/>);
    const instance = wrapper.instance();
    const Expectedparam = {};
    const ExpectedmodalVisible = false;
    instance._closeModal();
    expect(instance.state.modalVisible).toEqual(ExpectedmodalVisible);
    expect(instance.state.currentItem).toEqual(Expectedparam);
  
  });
});
