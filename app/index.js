/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import styles from './index.style';
import TextArea from './components/TextArea';
import {
  View
} from 'react-native';

export default class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <TextArea/>
      </View>
    );
  }
}

