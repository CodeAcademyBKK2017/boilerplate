import React, {Component} from 'react';
import styles from './AboutDev.style';
import {Text, View} from 'react-native';

export default class AboutDevScreen extends Component {
    static navigationOptions = {
      title: 'About Developer'
    };
      
    render () {
      return (
        
        <View style={styles.container}>
          <Text>About Developer</Text>
        </View>
      );
    }
  
}