/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import React, {Component} from 'react';
import styles from './index.style';
import {
  View
} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Content/>
      </View>
    );
  }
}
