import React, {Component} from 'react';
import {Text} from 'react-native';

export default class AboutAppScreen extends Component {
    static navigationOptions = {
      title: 'About App'
    };
      
    render () {
      return (
        <Text>About App</Text>
      );
    }
  
}