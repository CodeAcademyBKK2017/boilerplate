import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Title.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

const Title = ({onChangeText, value}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Note Title</Text>
    <TextInput 
      value={value}
      placeholder='Title here!' 
      style={styles.textInput} 
      autoCorrect={false} 
      onChangeText={onChangeText}
      underlineColorAndroid='transparent'
    />
  </View>
);

Title.propTypes = {
  onChangeText: PropTypes.func,
  value: PropTypes.string
};

Title.defaultProps = {
  onChangeText: noop,
  value: ''
};

export default Title;

