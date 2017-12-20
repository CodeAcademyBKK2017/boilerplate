import React, {Component} from 'react';
import styles from './Footer.styles';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableHighlight>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableHighlight>
        <Text style={styles.charCount}>150 characters</Text>
      </View>
    );
  }
}

