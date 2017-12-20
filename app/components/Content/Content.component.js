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
        <Text style={styles.title}>Please type your note below</Text>
        <TextInput style={styles.textInput} multiline={true}/>
      </View>
    );
  }
}
