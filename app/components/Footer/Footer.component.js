import React, {Component} from 'react';
import styles from './Footer.style.js';
import {
  Button
  , Text
  , View
} from 'react-native';

class Footer extends Component {
  saveAction = () => {

  }
  render () {
    return (
      <View style={styles.container}>
        <Button style={styles.saveButton} title='Save' onPress={this.saveAction} />
        <Text style={styles.countLabel}>chracters</Text>
      </View>
    );
  }
}

export default Footer;