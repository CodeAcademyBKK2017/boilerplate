/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import styles from './Index.style';
import TextArea from './components/TextArea/TextArea.component.js';
import {
  View
} from 'react-native';

export default class App extends Component {
  state = {
    text: ''
  }
  render () {
    return (
      <View style={styles.container}>
        <TextArea /> 
      </View>
    );
  }
}

