import App from './app';
import React from 'react';
import {TabNavigator} from 'react-navigation';

const MyApp = TabNavigator({
  App: {
    screen: App
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});
export default MyApp;
  