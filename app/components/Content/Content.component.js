import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Content.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

const Content = ({onChangeText, value}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Plase type your note below</Text>
    <TextInput
      value={value}
      multiline={true}
      placeholder='Type here!'
      style={styles.textInput}
      autoCorrect={false}
      underlineColorAndroid='transparent'
      onChangeText={onChangeText}
    />
  </View>
);

Content.propTypes = {
  onChangeText: PropTypes.func,
  value: PropTypes.string
};

Content.defaultTypes = {
  onChangeText: noop,
  value: ''
};

export default Content;

