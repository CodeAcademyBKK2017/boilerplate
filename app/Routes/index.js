import About from '../components/About/About.component';
import AboutDev from '../components/About/AboutDev.component';
import App from '../index';
import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

const MyApp = TabNavigator({
  AboutApp: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About',
      tabBarLabel: 'About'
      
    }
  },
  AboutDev: {
    screen: AboutDev,
    navigationOptions: {
      headerTitle: 'AboutDev',
      tabBarLabel: 'AboutDev'
    }
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
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