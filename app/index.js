/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Styles from './index.style';
import TextArea from './components/TextArea/TextArea.component';
import {View} from 'react-native';

export default class App extends Component {
  render () {
    return (
      <View style={Styles.container}>
        <TextArea />
      </View>
    );
  }
}