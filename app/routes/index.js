import About from '../about';
import App from '../index';
import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

const MyApp = TabNavigator({
  AboutApp: {
    screen: About,
    navigationOptions: {
      tabBarLabel: 'About App'
    }
  },
  AboutDev: {
    screen: About,
    navigationOptions: {
      tabBarLabel: 'About Dev'
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true
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
