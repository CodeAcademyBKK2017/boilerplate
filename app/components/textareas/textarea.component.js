/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import styles from './textarea.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class App extends Component<{}> {
  state = {
    text: ''
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Content
        </Text>
        <TextInput
          style = {styles.textArea}
          multiline = {true}
          value={this.state.text}
        />
      </View>
    );
  }
}
