import React, {Component} from 'react';
import {Text} from 'react-native';

export default class AboutDevScreen extends Component {
    static navigationOptions = {
      title: 'About Developer'
    };
      
    render () {
      return (
        <Text>About Developer</Text>
      );
    }
  
}