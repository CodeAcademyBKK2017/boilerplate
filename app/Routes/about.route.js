/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import AboutApp from '../components/about/aboutApp.component';
import AboutDev from '../components/about/aboutDev.vomponent';
import React from 'react';
import {TabNavigator} from 'react-navigation';

const MyApp = TabNavigator({
  Home: {
    screen: AboutApp
  },
  Notifications: {
    screen: AboutDev
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    tabStyle: {
      justifyContent: 'center'
    },
    labelStyle: {
      fontSize: 20,
      marginTop: 0
    }
  }
});

export default MyApp;