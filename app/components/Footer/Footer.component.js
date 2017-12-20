import React, {Component} from 'react';
import styles from './Footer.style.js';
import {
  Button
  , Text
  , TouchableOpacity
  , View
} from 'react-native';

class Footer extends Component {
  saveAction = () => {

  }
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.saveAction}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
        <Text style={styles.countLabel}>chracters</Text>
      </View>
    );
  }
}

export default Footer;