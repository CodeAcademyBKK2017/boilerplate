
import aboutRoutes from './aboutRoutes';
import App from '../app'; 
import Icon from 'react-native-vector-icons/Foundation';
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

const homeStack = StackNavigator({
  home: {
    screen: App,
    navigationOptions: (naviObject) =>  {
      const toggle = () => naviObject.navigation.navigate('DrawerToggle');
      return {
        // eslint-disable-next-line
        headerLeft: <Touchable onPress={toggle}><Icon name='list' size={20}/></Touchable>,
        headerTitle: 'Start taking notes'
      };
    }
  }   
});
const RootNavigator = DrawerNavigator({
  home: {
    screen: homeStack,
    navigationOptions: {
      drawerLabel: 'Home'

    }
  },
  About: {
    screen: aboutRoutes,
    navigationOptions: {
      drawerLabel: 'About'

    }
  }
});

export default RootNavigator;