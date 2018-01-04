
import aboutRoutes from './aboutRoutes';
import App from '../index'; 
import React from 'react';
import {StackNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  home: {
    screen: App,
    navigationOptions: {
      title: 'Start taking notes'
    }
  },
  About: {
    screen: aboutRoutes
  }
});

export default RootNavigator;