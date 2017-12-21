import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import ReplaceArrayIndex from 'replace-array-index';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import {
  View
} from 'react-native';

export default class App extends Component {
  state = {
    characterCount: 0,
    currentTitle: '',
    currentContent: '',
    notes: []
  }

  onTitleChangeText = (value) => {
    this.setState({
      currentTitle: value
    });
  }

  onContentChangeText = (value) => {
    this.setState({
      currentContent: value,
      characterCount: value.length
    });
  }

  onSaveButtonPress = () => {
    const {notes, currentTitle, currentContent} = this.state;
    const note = {
      title: currentTitle,
      content: currentContent
    };

    const newNotes = ReplaceArrayIndex(notes, notes.length, note);

    console.log(newNotes);

    this.setState({
      notes: newNotes,
      currentTitle: '',
      currentContent: '',
      characterCount: 0
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.characterCount} onSaveButtonPress={this.onSaveButtonPress} />
      </View>
    );
  }
}