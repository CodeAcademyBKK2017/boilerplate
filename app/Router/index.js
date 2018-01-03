import About from './about';
import App from '../index';
import React from 'react';
import {StackNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Start taking notes.'
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: 'Start taking notes.'
    }
  }
});

export default RootNavigator;