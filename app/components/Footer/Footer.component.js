import React from 'react';
import styles from './Footer.styles';
import Touchable from 'react-native-platform-touchable';

import {
  Text,
  View
} from 'react-native';

const Footer = () => (
  <View style={styles.container}>
  
    <Touchable>
      <Text style={styles.saveButton}>Save</Text>
    </Touchable>
        
    <Text style={styles.charCount}>150 characters</Text>
  </View>
);

export default Footer;

