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
      <View>
        <Text style={styles.instructions}>Content</Text>
        <TextInput 
          style={styles.textInput}
          multiline= {true}
          numberOfLines= {4}
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  textInput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 100, 
    width: 180,
    borderColor: 'gray', 
    borderWidth: 1
  }
});