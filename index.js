import App from './app/index';
import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  About: {
    screen: () => null,
    navigationOptions: {
      title: 'About'
    }
  }

});

AppRegistry.registerComponent('NoteTaker', () => RootNavigator);
