import PropTypes from 'prop-types';
import React from 'react';
import styles from './Footer.styles';
import Touchable from 'react-native-platform-touchable';

import {
  Text,
  View
} from 'react-native';

const Footer = ({characterCount}) => (
  <View style={styles.container}>
  
    <Touchable>
      <Text style={styles.saveButton}>Save</Text>
    </Touchable>
        
    <Text style={styles.charCount}>{characterCount} characters</Text>
  </View>
);

Footer.propTypes = {
  characterCount: PropTypes.number.isRequired
};

Footer.defaultTypes = {
  characterCount: 0
};

export default Footer;

