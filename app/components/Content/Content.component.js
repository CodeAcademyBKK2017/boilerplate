import React, {Component} from 'react';
import styles from './Content.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Content</Text>
        <TextInput style={styles.textInput} placeholder='Type here'/>
      </View>
    );
  }
}
