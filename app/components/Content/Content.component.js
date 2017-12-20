import contentStyles from './Content.style';
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View style={contentStyles.container}>
        <Text style={contentStyles.fontTitle}>
          Please type your note below
        </Text>
        <TextInput style={contentStyles.inputBox} multiline = {true} underlineColorAndroid= 'transparent'/>
      </View>
    );
  }
}

export default Content;

