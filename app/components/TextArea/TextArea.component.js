import React, {Component} from 'react';
import styles from './TextArea.style';
import {
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