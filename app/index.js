import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import React, {Component} from 'react';
import styles from './index.style.js';
import Title from './components/Title/Title.component';
import {
  View
} from 'react-native';

export default class App extends Component {
  state = {
    countContentCharacters: 0
  }
  onKeyPress = (textInput) => {
    this.setState({countContentCharacters: textInput.length});
  }
  render () {
    return (
      <View style={styles.container}>
        <Title />
        <Content onKeyPress={this.onKeyPress} />
        <Footer countContentCharacters={this.state.countContentCharacters} />
      </View>
    );
  }
}