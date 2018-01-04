import About from '../app/components/About/About.component';
import Main from '../app/index';
import React from 'react';
import {StackNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerTitle: 'Start taking notes.'
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About us'
    }
  }
});

export default RootNavigator;