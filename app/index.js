/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TextAlign from './components/TextArea/TextArea.components';
import {
  StyleSheet,
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
