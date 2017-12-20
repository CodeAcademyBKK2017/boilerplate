/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import styles from './content.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
            Please type your note below.
        </Text>
        <TextInput
          style = {styles.textArea}
          multiline = {true}
        />
      </View>
    );
  }
}
