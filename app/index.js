/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
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
    const state = {...this.state, textTitle};
    this.setState(state);
  }

  onChangeTextContent = (textContent) => {
    const state = {...this.state, textContent};
    this.setState(state);
  }

  onSaveButtonPress = () => {
    const notes = [...this.state.notes];
    const note = {
      title: this.state.textTitle,
      content: this.state.textContent
    };
    notes.push(note);
    console.log(notes);

    const state = {
      ...this.state,
      textTitle: '',
      textContent: '',
      notes
    };
    this.setState(state);
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
      </this.WrapperView>
    );
  }
}
