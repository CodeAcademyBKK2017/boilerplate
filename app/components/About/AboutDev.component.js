import React, {Component} from 'react';
import {
  Text
} from 'react-native';

export default class AboutApp extends Component {

  static navigationOptions = {
    drawerLabel: 'About',
    title: 'About'
  }

  render () {
    return (
      <Text>AboutDev Tab</Text>
    );
  }
}