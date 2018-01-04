import About from '../about';
import App from '../index';
import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

const MyApp = TabNavigator({
  AboutApp: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About App Title',
      tabBarLabel: 'About App Tab'
    }
  },
  AboutDev: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About Dev Title',
      tabBarLabel: 'About Dev Tab'
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  backBehavior: 'none'
  // tabBarOptions: {
  //   activeTintColor: '#e91e63'
  // }
});

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Note Taker'
    }
  },
  About: {
    screen: MyApp
  }
});

export default RootNavigator;
