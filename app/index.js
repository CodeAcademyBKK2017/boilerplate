/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.components';
import Footer from './components/Footer/Footer.components';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.components';

import {
  View
} from 'react-native';

export default class App extends Component {
  state ={
    text: '',
    textTitle: '',
    notes: []
  }
  texts =(v) => {
    this.setState({text: v});
  }
  onTitle =(v) => {
    this.setState({textTitle: v});
  }
  noteTitle =() => { 
    
    const data = {'text': this.state.text, 'title': this.state.textTitle};
    const newNotes = [data, ...this.state.notes];
    // console.log(newNotes);

    this.setState({textTitle: '', text: '', 'notes': newNotes});
  }
  render () {
    return (
      <View style={styles.container}>  
        <Title titles={this.onTitle} delTitle={this.state.textTitle}/>
        <Content  fn={this.texts} delContene={this.state.text}/>
        <Footer texts={this.state.text} noteTitles={this.noteTitle}/>
      </View>
    );
  }
}
