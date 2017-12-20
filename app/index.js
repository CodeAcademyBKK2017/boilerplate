/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TextAlign from './components/TextArea/TextArea.components';
import styles from './index.style';
import {
  View
} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>  
        <TextAlign/>
      </View>
    );
  }
}
