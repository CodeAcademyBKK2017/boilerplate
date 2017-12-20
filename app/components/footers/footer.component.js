/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import styles from './footer.style';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class Content extends Component {
  state = {
    text: ''
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.Save}>
            Save
          </Text>
        </TouchableOpacity>
        <Text style={styles.Count}>
            150 charector
        </Text> 
      </View>
    );
  }
}
