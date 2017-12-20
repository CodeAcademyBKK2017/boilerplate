/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import styles from './title.style';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class Title extends Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.titleHead}>
          <Text style={styles.NText}>
            Note Title
          </Text>
          <TouchableOpacity>
            <Text style={styles.btnText}>
            EN
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style = {styles.textArea}
          multiline = {true}
        />
      </View>
    );
  }
}
