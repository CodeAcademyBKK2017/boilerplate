import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Footer.styles';
import Touchable from 'react-native-platform-touchable';

import {
  Text,
  View
} from 'react-native';

const Footer = ({characterCount, onSaveButtonPress}) => (
  <View style={styles.container}>
  
    <Touchable onPress={onSaveButtonPress}>
      <Text style={styles.saveButton}>Save</Text>
    </Touchable>
        
    <Text style={styles.charCount}>{characterCount} characters</Text>
  </View>
);

Footer.propTypes = {
  onSaveButtonPress: PropTypes.func,
  characterCount: PropTypes.number.isRequired
};

Footer.defaultTypes = {
  onSaveButtonPress: noop,
  characterCount: 0
};

export default Footer;

