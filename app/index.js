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
      notes: [...this.state.notes, newData],
      title: '',
      content: ''
    });
  }

  onTypeContent = (textInput) => {
    this.setState({content: textInput});
  }

  onTypeTitle = (titleInput) => {
    this.setState({title: titleInput});
  }

  render () {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Title onTypeTitle={this.onTypeTitle} text={this.state.title}/>
        <Content onTypeContent={this.onTypeContent} text={this.state.content}/>
        <Footer countContent={this.state.content.length} onSavePress={this.onSavePress} />
      </View>
    );
  }
}