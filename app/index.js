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
  View
} from 'react-native';

export default class App extends Component {
  state = {
    title: '',
    content: '',
    notes: []
  }

  onSavePress = () => {
    const newData = {
      title: this.state.title,
      content: this.state.content
    };
    this.setState({
      notes: [...this.state.notes, newData]
    });
  }

  onTypeContent = (textInput) => {
    this.setState({content: textInput});
  }

  onTypeTitle = (titleInput) => {
    this.setState({title: titleInput});
  }

  render () {
    return (
      <View style={styles.container}>
        <Title onTypeTitle={this.onTypeTitle}/>
        <Content onTypeContent={this.onTypeContent}/>
        <Footer countContent={this.state.content.length} onSavePress={this.onSavePress} />
      </View>
    );
  }
}