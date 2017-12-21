import React from 'react';
import styles from './Title.styles';
import {
  Text,
  TextInput,
  View
} from 'react-native';

const Title = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Note Title</Text>
    <TextInput placeholder='Title here!' 
      style={styles.textInput} 
      autoCorrect={false} 
      underlineColorAndroid='transparent'
    />
  </View>
);

export default Title;

