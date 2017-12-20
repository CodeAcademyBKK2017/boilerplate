import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class NoteText extends Component<{}> {
  render () {
    return (
      <View style={styles.boxTextArea}>
        <Text style={styles.welcome}>
          Content
        </Text>
        <TextInput underlineColorAndroid='transparent' style={styles.inputText}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxTextArea: {
    width: '100%',
    padding: 10
  },
  inputText: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    marginBottom: 10
  }
});
