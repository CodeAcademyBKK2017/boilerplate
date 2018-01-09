import apiNotes from '../api';
import App from '../app';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Alert, AsyncStorage} from 'react-native';
import {shallow} from 'enzyme';

jest.mock('../api'); // file mock

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn(() => Promise.resolve('')),
  setItem: jest.fn(() => Promise.resolve())
}));

jest.mock('uuid', () => () => 'some uuid');

describe('App', () => {

  const props = {};
  const wrapper = shallow(<App {...props}/>);
  const instance = wrapper.instance();
      
  const stateClear = {
    modalData: {},
    titleText: '',
    contentText: '',
    NOTES: []
  };

  it('renders correctly', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeDefined();
    expect(tree).toMatchSnapshot();
  });

  it('Check state', () => {
    expect(instance.state.titleText).toEqual('');
    expect(instance.state.contentText).toEqual('');
  });

  it('Check Function onContentChange', () => {
    instance.onContentChange('some');
    expect(instance.state.contentText).toEqual('some');
    expect(instance.state.contentText.length).toEqual(4);
  });
  
  it('Check Function onTitleChenge', () => {
    instance.onTitleChange('title');
    expect(instance.state.titleText).toEqual('title');
  });

  it('Check Function showFlatList', () => {
    instance.onTitleChange('React Native');
    instance.onContentChange('- UI');
    instance.onSave();
    expect(instance.showFlatList).toMatchSnapshot();
  }); 

  it('Check Function viewOverlay', () => {
    const note = {
      title: 'React Native',
      content: '- UI',
      key: 0
    };
    instance.onShowModal(note);
    expect(instance.viewOverlay).toMatchSnapshot();
  });

  it('Check Function onShowModal', () => {
    const note = {
      title: 'React Native',
      content: '- UI',
      key: 0
    };
    instance.onShowModal(note)();
    expect(instance.state.modalData).toEqual(note);
  });

  it('Check Function onCloseModal', () => {
    instance.onCloseModal();
    expect(instance.state.modalData).toEqual({});
  });

  it('Check Function openAbout with mock', () => { // mock
    const props = {
      navigation: {
        navigate: jest.fn()
      }
    };
    const wrapper = shallow(<App {...props}/>);
    const instance = wrapper.instance();
    instance.openAbout();
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('About');
  });

  it('Check Function openAbout with spy', () => { // spy
    const props = {
      navigation: {
        navigate: () => {}
      }
    };
    const appComp = <App {...props}/>;
    const wrapper = shallow(appComp);
    const instance = wrapper.instance();
    const spyFunc = jest.spyOn(props.navigation, 'navigate');

    instance.openAbout();
    
    expect(spyFunc).toHaveBeenCalledWith('About');
  });

  it('componentDidMount with existed notes', () => {
    jest.spyOn(instance, 'onLoadDataState');
    instance.componentDidMount();    
    expect(instance.onLoadDataState).toBeCalled();
  });

  it('onLoadDataState', async () => { // connect server success !!

    instance.setState(stateClear); // clear state
    
    const notes = await apiNotes.getNotes();
    instance.setState({NOTES: notes});

    const expected = {
      modalData: {},
      titleText: '',
      contentText: '',
      NOTES: [{
        title: 'React Native',
        content: '- UI',
        key: 0,
        id: 1
      }]
    };
    expect(instance.state).toEqual(expected);
  });

  xit('Check Function onSave success', async () => {

    instance.setState(stateClear); // clear state

    const title = 'React Native';
    const content = '- UI';
    instance.setState({titleText: title, contentText: content});

    await instance.onSave();

    const expectedNote = {
      'title': 'React Native',
      'content': '- UI',
      'key': 0
    };

    const expected = {
      modalData: {},
      titleText: '',
      contentText: '',
      NOTES: [{
        title: 'React Native',
        content: '- UI',
        key: 0,
        id: 1
      }]
    };

    expect(apiNotes.addNotes).toHaveBeenLastCalledWith(expectedNote);
    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('state', JSON.stringify(expected));
    expect(instance.state).toEqual(expected);
  });

  it('Check Function onSave failure', async () => {
    await instance.onSave();
    apiNotes.addNotes.mockClear();
    AsyncStorage.setItem.mockClear();
    apiNotes.addNotes.mockImplementation(() => Promise.reject('API failed'));
    expect(AsyncStorage.setItem).not.toBeCalled();
  });

  xit('Check Function onDelete', async () => {

    instance.setState(stateClear); // clear state

    const note = [{
      title: 'React Native',
      content: '- UI',
      key: 0,
      id: 1
    }];
    
    console.log(instance.state);

    instance.setState({NOTES: note});

    console.log(instance.state);

    instance.onDelete(note);

    console.log(instance.state);

    expect(apiNotes.deleteNotes).toBeCalled();
    expect(instance.state).toEqual(stateClear);
  });

  xit('onDeletePress failure', async () => {
    apiNotes.deleteNote.mockClear();
    AsyncStorage.setItem.mockClear();
    apiNotes.deleteNote.mockImplementation(() => Promise.reject('API failed'));
    await instance.onDeletePress()();
    expect(AsyncStorage.setItem).not.toBeCalled();
    expect(Alert.alert).toBeCalled();
  });
});
