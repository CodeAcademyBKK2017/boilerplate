import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Content</Text>
        <TextInput style={styles.textInput} placeholder='Type here'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});
