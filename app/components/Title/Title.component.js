import React, {Component} from 'react';
import styles from './Title.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Title extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Note Title</Text>
        <TextInput placeholder='Title here!' style={styles.textInput} />
      </View>
    );
  }
}

