import api from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style.js';
// import uuid from 'uuid';
import Title from './components/Title/Title.component';
import {
  Alert,
  AsyncStorage,
  Button,
  View
} from 'react-native';

// const replaceIndex = (array, index, replaceWith) => [...array.slice(0, index), replaceWith, ...array.slice(index + 1, array.length)];

export default class App extends Component {
  state = {
    titleTextInput: '',
    contentTextInput: '',
    notes: []
  }
  componentDidMount () {
    this.componentDidMountFn();
  }
  componentDidMountFn = async () => {
    const notes = await api.getNotes();
    if (notes instanceof Array) {
      this.setState({titleTextInput: '', contentTextInput: '', notes: notes});
    } else {
      Alert.alert('get Notes API fail');
      await AsyncStorage.getItem('notes').then((value) => {
        this.setState({titleTextInput: '', contentTextInput: '', notes: JSON.parse(value)});
      });
    }
  }
  onKeyPressTitle = (textInput) => {
    this.setState({titleTextInput: textInput});
  }
  onKeyPressContent = (textInput) => {
    this.setState({contentTextInput: textInput});
  }
  onSave = async () => {
    if (this.state.titleTextInput && this.state.contentTextInput) {
      const note = await api.addNote({title: this.state.titleTextInput, content: this.state.contentTextInput});
      if (note.hasOwnProperty('id') && note.hasOwnProperty('title') && note.hasOwnProperty('content')) {
        const newStateNote = [...this.state.notes, note];
        this.updateState({notes: newStateNote, titleTextInput: '', contentTextInput: ''});
      } else {
        Alert.alert('save not API fail!');
      }
    }
  }
  onDeleteNote =  ({id}) => async () => {
    await api.deleteNote(id);
    const otherNote = this.state.notes.filter((note) => note.id !== id);
    this.updateState({notes: otherNote, titleTextInput: '', contentTextInput: ''});
  }
  updateState = (obj) => {
    this.setState(obj, async () => {
      await AsyncStorage.setItem('notes', JSON.stringify(this.state.notes)).then(() => {
        // AsyncStorage.getItem('notes').then((value) => {
        //   console.log('updateState : AsyncStorage');
        //   console.log(JSON.parse(value));
        // });
      });
    });
  }
  navigateTo = (key) => () => this.props.navigation.navigate(key)
  render () {
    // console.log('this.props.navigation', this.props.navigation);
    return (
      <View style={styles.container}>
        <Title onKeyPressTitle={this.onKeyPressTitle} text={this.state.titleTextInput} />
        <Content onKeyPressContent={this.onKeyPressContent} text={this.state.contentTextInput} />
        <NoteList notes={this.state.notes} state={this.state} onDeleteNote={this.onDeleteNote} />
        <Footer countContentCharacters={this.state.contentTextInput.length} onSave={this.onSave} />
        <Button onPress={this.navigateTo('About')} title='Go to About' />
      </View>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object
};
App.defaultProps = {
  navigation: {}
};