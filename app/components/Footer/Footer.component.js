import React, {Component} from 'react';
import styles from './Footer.style';
import {
  Button,
  Text,
  View
} from 'react-native';

export default class Footer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.status}>
          <Button style={styles.saveButton} title='Save'/>
          <Text style={styles.charLength}>150 characters</Text>
        </View>
      </View>
    );
  }
}
