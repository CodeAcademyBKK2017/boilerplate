import React, {Component} from 'react';
import styles from './AboutDev.style';
import {Text, View} from 'react-native';

export default class AboutDev extends Component {
  render () {
    return (
      <View style={styles.container} >
        <Text>This is About Developer</Text>
      </View>
    );
  }
}