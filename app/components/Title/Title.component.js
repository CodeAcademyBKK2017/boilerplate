import React, {Component} from 'react';
import titleStyles from './Title.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Title extends Component {
  render () {
    return (
      <View>
        <Text style={titleStyles.fontTitle}>
          Note Title
        </Text>
        <TextInput style={titleStyles.inputBox} underlineColorAndroid= 'transparent'/>
      </View>
    );
  }
}

export default Title;

