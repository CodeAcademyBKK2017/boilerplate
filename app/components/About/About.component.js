import AboutApp from './AboutApp.component';
import AboutDev from './AboutDev.component';
import React from 'react';
import {TabNavigator} from 'react-navigation';

const About = TabNavigator({
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
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
      marginTop: 0
    },
    tabStyle: {
      justifyContent: 'center'
    },
    activeTintColor: '#e91e63'
  }
});

export default About;