import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import React, {Component} from 'react';
import styles from './index.style.js';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  FlatList,
  Text,
  View
} from 'react-native';

// const replaceIndex = (array, index, replaceWith) => [...array.slice(0, index), replaceWith, ...array.slice(index + 1, array.length)];

export default class App extends Component {
  state = {
    titleTextInput: '',
    contentTextInput: '',
    notes: []
  }
  onKeyPressTitle = (textInput) => {
    this.setState({titleTextInput: textInput});
  }
  onKeyPressContent = (textInput) => {
    this.setState({contentTextInput: textInput});
  }
  onSave = () => {
    if (this.state.titleTextInput && this.state.contentTextInput) {
      const newNote = {
        title: this.state.titleTextInput,
        content: this.state.contentTextInput,
        uuid: uuid()
      };
      const newStateNote = [...this.state.notes, newNote];
      this.setState({notes: newStateNote, titleTextInput: '', contentTextInput: ''}, () => {
        console.log(this.state);
      });
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Title onKeyPressTitle={this.onKeyPressTitle} text={this.state.titleTextInput} />
        <Content onKeyPressContent={this.onKeyPressContent} text={this.state.contentTextInput} />
        <NoteList notes={this.state.notes} state={this.state} />
        <Footer countContentCharacters={this.state.contentTextInput.length} onSave={this.onSave} />
      </View>
    );
  }
}