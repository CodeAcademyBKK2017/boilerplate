import React, {Component} from 'react';
import styles from './FooterBox.component.style';
import {
  Text,
  View
} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.footerStyle}>
        <Text style={styles.textFooter}>About Us</Text>
      </View>
    );
  }
}