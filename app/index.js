/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TextArea from './components/TextArea/TextArea.component.js';
import {
  StyleSheet,
  View
} from 'react-native';

export default class App extends Component {
  state = {
    text: ''
  }
  getName = () => 'Yo'

  render () {
    return (
      <View style={styles.container}>
        <TextArea /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
