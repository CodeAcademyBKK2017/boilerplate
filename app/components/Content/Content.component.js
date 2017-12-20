import React, {Component} from 'react';
import styles from './Content.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Plase type your note below</Text>
        <TextInput
          multiline={true}
          placeholder='Type here!'
          style={styles.textInput}
        />
      </View>
    );
  }
}

