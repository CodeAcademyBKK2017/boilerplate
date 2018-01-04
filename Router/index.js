import About from '../app/components/About/About.component';
import App from '../app/index';
import React from 'react';
import {StackNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About'
    }
  }
});

export default RootNavigator;
