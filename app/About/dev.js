import React, {Component} from 'react';
import {Text} from 'react-native';

export default class AboutDev extends Component {
    static navigationOptions = {
      tabBarLabel: 'Dev'
    };
  
    render () {
      return (
        <Text>AboutDev</Text>
      );
    }
}
