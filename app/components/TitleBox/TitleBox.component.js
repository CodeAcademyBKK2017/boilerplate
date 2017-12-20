import React, {Component} from 'react';
import styles from './TitleBox.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View style={styles.titleStyle}>
        <View style={styles.TitleStyleColum}>
          <Text style={styles.textTitle}>Note Title</Text>
          <View style={styles.languageTitle}><Text style={styles.textLanguage}>en</Text></View>
        </View>
        <TextInput 
          style={styles.textInput}
          placeholder={'Tasks for today'}
          placeholderTextColor={'#000'}
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }
}