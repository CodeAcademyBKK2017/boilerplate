import 'react-native';
import ListItem from '../ListItem.component';
import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('ListItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ListItem />
    );
    expect(tree).toBeDefined();
  });

  it('ListItem: MatchSnapshot', () => {
    const tree = renderer.create(<ListItem />);
    expect(tree).toMatchSnapshot();
  });

  it('ListItem: renderItemList', () => {
    const props = {};
    const wrapper = shallow(<ListItem {...props}/>);
    const instance = wrapper.instance();
    const param = {item: {content: 'Qweqw', key: 0, title: 'Eqweqwe'}};
    const tree = instance.renderItemList(param);
    expect(tree).toMatchSnapshot();
  });
});