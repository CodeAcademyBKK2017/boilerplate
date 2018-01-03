import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style.js';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
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
    // console.log('componentDidMount 1');
    AsyncStorage.getItem('state').then((value) => {
      // console.log('componentDidMount 2');
      // if (value !== null) {
      //   console.log(JSON.parse(value));
      //   this.setState(JSON.parse(value));
      // }
      this.setState(JSON.parse(value));
    });
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
      this.updateState({notes: newStateNote, titleTextInput: '', contentTextInput: ''});
    }
  }
  onDeleteNote = ({uuid}) => () => {
    const otherNote = this.state.notes.filter((note) => note.uuid !== uuid);
    this.updateState({notes: otherNote, titleTextInput: '', contentTextInput: ''});
  }
  updateState = (obj) => {
    this.setState(obj, () => {
      // console.log(this.state);
      AsyncStorage.setItem('state', JSON.stringify(this.state)).then(() => {
        // AsyncStorage.getItem('state').then((value) => {
        //   console.log('from storage');
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