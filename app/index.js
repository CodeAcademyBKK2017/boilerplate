/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TextArea from './components/TextArea/TextArea.component';
import {
  StyleSheet,
  View
} from 'react-native';

export default class App extends Component<{}> {
    getName = () => 'Yo'
    render () {
      return (
        <View style={styles.boxMain}>
          <TextArea/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  boxMain: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  }
});