import React, {Component} from 'react';
import titleStyle from './Title.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class Content extends Component {
  render () {
    return (
      <View style={titleStyle.boxTitle}>
        <Text style={titleStyle.textTitle}>
          New Title
        </Text>
        <TextInput underlineColorAndroid='transparent' style={titleStyle.inputText}/>
      </View>
    );
  }
}
