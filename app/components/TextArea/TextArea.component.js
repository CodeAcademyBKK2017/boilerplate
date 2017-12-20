import React, {Component} from 'react';
import styles from './TextArea.style.js';
import {
  Text
  , TextInput
  , View
} from 'react-native';

class TextArea extends Component {
  render () {
    return (
      <View>
        <Text>Content</Text>
        <TextInput
          style={styles.textArea}
          multiline = {true}
        />
      </View>
    );
  }
}

export default TextArea;