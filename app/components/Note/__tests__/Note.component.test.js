import 'react-native';
import noop from 'lodash/noop';
import Note from '../Note.component';
import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Note', () => {
  let wrapper, instance;
  beforeEach(() => {
    wrapper = shallow(<Note onDelete={noop} />);
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
  it('onOpen should have state change', () => {
    const title = 'xx';
    const content = 'yy';
    const expectedState = {
      modalVisible: true,
      title: 'xx',
      content: 'yy'
    };
    instance.onOpen(title, content)();
    expect(instance.state).toEqual(expectedState);
  });
  it('onClose should have state change', () => {
    const expectedInitialstate = {
      modalVisible: false,
      title: '',
      content: ''
    };
    instance.onClose();
    expect(instance.state).toEqual(expectedInitialstate);
  });
});