import About from '../../app/About/About';
import App from '../index';
import React from 'react';
import styles from './Router.style';
import {StackNavigator} from 'react-navigation';
import {Text, View} from 'react-native';

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Note Taker'
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About Us'
    }
  }
});

export default RootNavigator;