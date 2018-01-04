import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

export default class AboutApp extends Component {
  static navigationOptions = {
    tabBarLabel: 'AboutApp'
  };
  render () {
    return (
      <View>
        <Text>
           Hello From AboutApp
        </Text>
      </View>
    );
  }
}