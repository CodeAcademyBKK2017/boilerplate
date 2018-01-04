import React, {Component} from 'react';
import {
  Text
} from 'react-native';

export default class AboutDev extends Component {

  static navigationOptions = {
    drawerLabel: 'About',
    title: 'About'
  }

  render () {
    return (
      <Text>AboutApp Tab</Text>
    );
  }
}