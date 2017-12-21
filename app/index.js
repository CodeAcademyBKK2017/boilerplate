import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import {
  View
} from 'react-native';

export default class App extends Component {
  state = {
    currentTitle: '',
    currentContent: '',
    notes: []
  }

  onTitleChangeText = (currentTitle) => {
    this.setState({currentTitle});
  }

  onContentChangeText = (currentContent) => {
    this.setState({currentContent});
  }

  onSaveButtonPress = () => {
    const {notes, currentTitle, currentContent} = this.state;
    const newNotes = [...notes];

    newNotes.push({
      title: currentTitle,
      content: currentContent
    });

    console.log(newNotes);

    this.setState({
      notes: newNotes,
      currentTitle: '',
      currentContent: ''
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.currentContent.length} onSaveButtonPress={this.onSaveButtonPress} />
      </View>
    );
  }
}