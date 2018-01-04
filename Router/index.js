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
  //   screen: TabNavigator({
  //     AboutApp: {screen: AboutApp},
  //     AboutDev: {screen: AboutDev}
  //   },
  //   navigationOptions: {
  //     headerTitle: 'Home'
  //   },
  //   {
  //     tabBarPosition: 'bottom',
  //     animationEnabled: true,
  //     tabBarOptions: {
  //       activeTintColor: '#e91e63'
  //     },
  //     swipeEnabled: true
  //   })
    
  }
});

export default RootNavigator;
