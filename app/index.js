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
    text: ''
  }
  chacters = (t) => {
    this.setState({text: t});
  }
  render () {
    return (
      <View style={styles.container}>
        <Title />
        <Content texts={this.state.text} Fn={this.chacters}/> 
      </View>
    );
  }
}

