import About from '../about';
import App from '../index';
import React from 'react';
import {StackNavigator} from 'react-navigation';

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
