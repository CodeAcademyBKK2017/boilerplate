/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import Title from './components/Title/Title.component';
import {
  StyleSheet,
  View
} from 'react-native';

const replaceIndex = (array, index, replaceWith) => [...array.slice(0, index), replaceWith, ...array.slice(index + 1, array.length)];

export default class App extends Component {
    state = {
      count: 0,
      inputTitle: '',
      inputContent: '',
      note: []
    }
    
    onTypeTitle = (text) => {
      this.setState({inputTitle: text});
    }
    onTypeContent = (text) => {
      this.setState({inputContent: text});
      this.setState({count: text.length});
    }
    onSaveNote = () => {
      const data = {'title': this.state.inputTitle, 'content': this.state.inputContent};
      const newStateNote = [...this.state.note, data];
      this.setState(
        {
          note: newStateNote,
          inputTitle: '',
          inputContent: ''
        }, () => {
          console.log('note: ', this.state.note);
        });
    }
    render () {
      return (
        <View style={styles.boxMain}>
          <Title onTypeTitle={this.onTypeTitle} inputTitle={this.state.inputTitle}/>
          <Content onType={this.onTypeContent} inputContent={this.state.inputContent}/>
          <Footer showNumber={this.state.count} onSaveNote={this.onSaveNote}/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  boxMain: {
    flex: 1
  }
});