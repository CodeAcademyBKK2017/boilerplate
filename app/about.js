import React, {Component} from 'react';
import {Text} from 'react-native';

export default class AboutScreen extends Component {
    static navigationOptions = {
      title: 'About'
    };
      
    render () {
      return (
        <Text>About</Text>
      );
    }
  
}