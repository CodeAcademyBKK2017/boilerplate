import React, {Component} from 'react';
import styles from './index.style.js';
import TextArea from './components/TextArea/TextArea.component';
import {
  View
} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TextArea />
      </View>
    );
  }
}