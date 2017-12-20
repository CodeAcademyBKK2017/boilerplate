import React, {Component} from 'react';
import style from './HeaderBox.component.style';
import {
  Text,
  View
} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View>
        <View style={style.viewStyle}>
          <Text style={style.textStyle}>Start taking notes.</Text>
        </View>
        <View style={style.divide}/>
      </View>
    );
  }
}