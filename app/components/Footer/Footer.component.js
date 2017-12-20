import React, {Component} from 'react';
import styles from './Footer.style';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.status}>
          <TouchableOpacity>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
          <Text style={styles.charLength}>150 characters</Text>
        </View>
      </View>
    );
  }
}
