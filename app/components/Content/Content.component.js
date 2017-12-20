import React, {Component} from 'react';
import styles from './Content.style';
import {
  Text,
  TextInput,
  View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View>
        <View style={styles.content}>
          <Text style={styles.welcome}>
          Please type your note below
          </Text>
        </View>
        <View style={styles.conArea}>
          <TextInput
            style={styles.textArea}
            multiline = {true}
            numberOfLines = {4}
            underlineColorAndroid = 'transparent'
          />
        </View>
        <View style={styles.title}>
          <View style={styles.noteLeft}>
            <Text style={styles.note}>Save</Text>
          </View>
          <View style={styles.noteRight}>
            <Text>150 chacters</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Content;
