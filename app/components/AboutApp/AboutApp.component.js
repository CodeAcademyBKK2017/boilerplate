import React, {Component} from 'react';
import styles from './AboutApp.style';
import {Text, View} from 'react-native';

export default class AboutAppScreen extends Component {
    static navigationOptions = {
      title: 'About App'
    };
      
    render () {
      return (
        <View style={styles.container}>
          <Text>About App</Text>
        </View>
        
      );
    }
  
}