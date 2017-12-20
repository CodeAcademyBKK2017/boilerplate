
import React, {Component} from 'react';
import styles from './Title.style';
import {Text, TextInput, View} from 'react-native';

export default class Title extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Note Title</Text>
        <TextInput style={styles.textArea} underlineColorAndroid='transparent'/>
      </View>
    );
  }
}