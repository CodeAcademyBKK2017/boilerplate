import React, {Component} from 'react';
import styles from './ContentBox.component.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

export default class TextArea extends Component {
  render () {
    return (
      <View style={styles.contentStyle}>
        <View style={styles.contentStyleColum}>
          <Text style={styles.textContent}>Please type your note below</Text>
        </View>
        <TextInput 
          style={styles.textInput}
          multiline= {true}
          placeholder={'- Understand how react-native works.\n- Build a native android and iOS app.\n- Setup CI for automated builds.\n- Conventions to manage the codebase.'}
          underlineColorAndroid='transparent'
        />
        <View style={styles.saveTabStyle}><Text style={styles.saveTextStyle}>Save</Text><Text>150 chacters</Text></View>
      </View>
    );
  }
}