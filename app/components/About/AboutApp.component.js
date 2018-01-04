import React, {Component} from 'react';
import styles from './AboutApp.style';
import {Text, View} from 'react-native';

export default class AboutApp extends Component {
  render () {
    return (
      <View style={styles.container} >
        <Text>This is About App</Text>
      </View>
    );
  }
}