import React, {Component} from 'react';
import styles from './index.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Content</Text>
        <TextInput
          multiline={true}
          placeholder='Type here!'
          style={styles.textInput}
        />
      </View>
    );
  }
}