import React, {Component} from 'react';
import styles from './TextArea.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class InputText extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Content
        </Text>
        <TextInput style={styles.inputBox} multiline = {true}/>
      </View>
    );
  }
}

export default InputText;

