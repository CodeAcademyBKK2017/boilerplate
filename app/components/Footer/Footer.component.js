import React from 'react';
import styles from './Footer.styles';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const Footer = () => (
  <View style={styles.container}>
    <TouchableHighlight>
      <Text style={styles.saveButton}>Save</Text>
    </TouchableHighlight>
    <Text style={styles.charCount}>150 characters</Text>
  </View>
);

export default Footer;

