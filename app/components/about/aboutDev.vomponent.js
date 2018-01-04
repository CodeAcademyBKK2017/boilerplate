import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

export default class AboutDev extends Component {
    static navigationOptions = {
      tabBarLabel: 'AboutDev'
    };
    render () {
      return (
        <View>
          <Text>
           Hello From AboutDev
          </Text>
        </View>
      );
    }
}