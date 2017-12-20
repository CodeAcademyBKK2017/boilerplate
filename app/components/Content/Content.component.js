import React from 'react';
import styles from './Content.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

const Content = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Plase type your note below</Text>
    <TextInput
      multiline={true}
      placeholder='Type here!'
      style={styles.textInput}
      autoCorrect={false}
      underlineColorAndroid='transparent'
    />
  </View>
);

export default Content;

