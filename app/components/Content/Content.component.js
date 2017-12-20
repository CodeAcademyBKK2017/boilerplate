import contentStyle from './Content.style';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {
  render () {
    return (
      <View style={contentStyle.boxTextArea}>
        <Text style={contentStyle.welcome}>
          Please type your note below
        </Text>
        <TextInput underlineColorAndroid='transparent' style={contentStyle.inputText} multiline = {true} numberOfLines = {4}/>
      </View>
    );
  }
}
