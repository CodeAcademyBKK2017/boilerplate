import AboutApp from './AboutApp';
import AboutDev from './AboutDev';
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
  tabBarOptions: {
    activeTintColor: '#e91e63'
  },
  swipeEnabled: true
});

export default About;
