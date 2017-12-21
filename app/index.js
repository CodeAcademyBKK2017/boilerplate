/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import NoteList from './components/NoteList/NoteList.component';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  KeyboardAvoidingView, Platform, View
} from 'react-native';

export default class App extends Component {
  state = {
    textTitle: '',
    textContent: '',
    notes: []
  }

  WrapperView = Platform.select({
    ios: KeyboardAvoidingView,
    android: View
  });

  onChangeTextTitle = (textTitle) => {
    this.setState({textTitle});
  }

  onChangeTextContent = (textContent) => {
    this.setState({textContent});
  }

  onSaveButtonPress = () => {
    const notes = [...this.state.notes];
    const note = {
      key: uuid(),
      title: this.state.textTitle,
      content: this.state.textContent
    };
    notes.push(note);

    const newState = {
      textTitle: '',
      textContent: '',
      notes
    };
    this.setState(newState);
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Title
          text={this.state.textTitle}
          onChangeTextTitle={this.onChangeTextTitle}/>
        <Content
          style={styles.fill}
          text={this.state.textContent}
          onChangeTextContent={this.onChangeTextContent}/>
        <Footer
          textContentLength={this.state.textContent.length}
          onSaveButtonPress={this.onSaveButtonPress}/>
        {
          this.state.notes.length > 0 ? <NoteList data={this.state.notes}/> : null
        }
      </this.WrapperView>
    );
  }
}
