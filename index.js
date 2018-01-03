import App from './app/index';
import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Text, View} from 'react-native';

const About = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>About</Text>
  </View>
);
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
  
AppRegistry.registerComponent('NoteTaker', () => RootNavigator);
