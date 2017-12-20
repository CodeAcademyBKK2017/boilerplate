import React, {Component} from 'react';
import TextAreaStyle from './TextArea.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View style={TextAreaStyle.container}>
        <Text>Content</Text>
        <TextInput style={TextAreaStyle.textInput} placeholder='Type here'/>
      </View>
    );
  }
}
