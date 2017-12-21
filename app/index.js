/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component.js';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import {
  View
} from 'react-native';

export default class App extends Component {

  state = {
    title: '',
    text: '',
    NOTES: []
  }

  onCount = (v) => this.setState({text: v});
  onTitle = (v) => this.setState({title: v});
  saveNote = () => {
    const data = {'title': this.state.title, 'content': this.state.text};
    const newNotes = [...this.state.NOTES, data];
    this.setState(
      {title: '', text: '', 'NOTES': newNotes}
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Title titles={this.onTitle} textTitle={this.state.title}/>
        <Content texts={this.state.text} Fn={this.onCount} FnSave={this.saveNote}/> 
      </View>
    );
  }
}

