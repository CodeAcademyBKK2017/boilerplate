import 'react-native';
import Note from '../Note.component';
import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Note', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<Note />);
    instance = wrapper.instance();
  });
  it('snapshot test', () => {
    const snapshot = renderer.create(<Note />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('generateList should have been render some JSX', () => {
    const item =  {title: 'someTitle', content: 'someContent', key: 'someUUID'};
    const snapshot = instance.generateList({item});
    expect(snapshot).toMatchSnapshot();
  });

});