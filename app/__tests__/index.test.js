import Api from '../api';
import App from '../index';
import NoteList from '../components/NoteList/NoteList.component';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('uuid', () => () => 'someId');
jest.mock('../api');
jest.mock('Alert', () => ({
  alert: jest.fn()
}));
jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

describe('App', () => {
  let tree, instance;
  beforeEach(() => {
    tree = shallow(<App/>);
    instance = tree.instance();
  });
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    );
    expect(tree).toBeDefined();
  });
  it('rendersItem correctly', () => {
    const wrapper = shallow(<NoteList/>);
    instance = wrapper.instance();
    const item = {title: 'title', content: 'content', uuid: '1'};
    const snapshot = instance.renderItem({item});
    expect(snapshot).toMatchSnapshot();
  });
  it('onTypeContent: should change the value of content', () => {
    instance.onTypeContent('hello');
    expect(instance.state.content).toBe('hello');
    instance.onTypeContent('');  
    expect(instance.state.content).toBe('');
  });
  it('onTypeTitle: should change the value of title', () => {
    instance.onTypeTitle('test');
    expect(instance.state.title).toBe('test');
    instance.onTypeTitle('');  
    expect(instance.state.title).toBe('');
  });
  // it('onSavePress: should add note', () => {
  //   const newData = {
  //     title: 'title',
  //     content: 'content'
  //   };
  //   instance.setState(newData);
  //   instance.onSavePress();
  //   const expectState = {
  //     title: '',
  //     content: '',
  //     notes: [{
  //       title: 'title',
  //       content: 'content',
  //       key: 'someId'
  //     }]
  //   };
  //   expect(instance.state).toEqual(expectState);
  //   expect(AsyncStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(expectState));
  // });
  it('onSavePress success', async () => {
    const title = 'my test title';
    const content = 'my test message';
    instance.setState({title: title, content: content});

    await instance.onSavePress();
    const expected = {
      title: '',
      content: '',
      notes: [{
        title,
        content,
        key: 'someId'
      }]
    };

    const expectedNote = {
      'content': 'my test message',
      'key': 'someId',
      'title': 'my test title'
    };
    expect(Api.addNote).toHaveBeenLastCalledWith(expectedNote);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('notes', JSON.stringify(expected.notes));
    expect(instance.state).toEqual(expected);
  });

  it('onSavePress failure', async () => {
    Api.addNote.mockClear();
    AsyncStorage.setItem.mockClear();
    Api.addNote.mockImplementation(() => Promise.reject('API failed'));
    await instance.onSavePress();
    expect(AsyncStorage.setItem).not.toBeCalled();
    expect(Alert.alert).toBeCalled();
  });

  it('onDeletePress success', async () => {
    const item = {
      title: 'title',
      content: 'content',
      key: 'someId'};
    await instance.onDeletePress(item)();
    const expectState = {
      title: '',
      content: '',
      notes: []
    };
    expect(Api.deleteNote).toHaveBeenLastCalledWith(item);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('notes', JSON.stringify(expectState));
  });

  it('onDeletePress failure', async () => {
    Api.deleteNote.mockClear();
    AsyncStorage.setItem.mockClear();
    Api.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    await instance.onDeletePress()();
    expect(AsyncStorage.setItem).not.toBeCalled();
    expect(Alert.alert).toBeCalled();
  });
  it('onShowModal', () => {
    const wrapper = shallow(<NoteList/>);
    instance = wrapper.instance();
    const item = {title: 'title', content: 'content'};
    const expectState = {
      showModal: true, title: 'title', content: 'content'
    };
    instance.onShowModal(item)();
    expect(instance.state).toMatchObject(expectState);
  });
  it('onCloseModal', () => {
    const wrapper = shallow(<NoteList/>);
    instance = wrapper.instance();
    instance.onCloseModal();
    expect(instance.state.showModal).toBe(false);
  });

  // it('onDeletePress: should delete the selected note', () => {
  //   const item = {
  //     title: 'title',
  //     content: 'content',
  //     key: 'someId'};
  //   const initialData = {
  //     title: '',
  //     content: '',
  //     notes: [item]
  //   };
  //   instance.setState(initialData);
  //   instance.onDeletePress(item)();
  //   const expectState = {
  //     title: '',
  //     content: '',
  //     notes: []
  //   };
  //   expect(instance.state).toEqual(expectState);
  //   expect(AsyncStorage.setItem).toHaveBeenCalledWith('state', JSON.stringify(expectState));
  // });
  it('componentDidMount with existed notes', () => {
    const expectState = [
      {
        key: 'some uuid',
        title: 'my test title',
        content: 'my test message'
      }
    ];
    // set custom mock result
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify(expectState)));
    instance.componentDidMount();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('state');
  });
  it('navigateTo Mock', () => {
    instance.props.navigation.navigate = jest.fn();
    instance.navigateTo('About')();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });
  it('navigateTo Spy', () => {
    const spyFunc = jest.spyOn(instance.props.navigation, 'navigate');
    instance.navigateTo('About')();
    expect(spyFunc).toHaveBeenCalledWith('About');
  });
});

