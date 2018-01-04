import AboutApp from '../components/About/AboutApp.component';
import AboutDev from '../components/About/AboutDev.component';
import Icon from 'react-native-vector-icons/Foundation';
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import {StackNavigator, TabNavigator} from 'react-navigation';

const tabRoute = TabNavigator(
  {
    aboutApp: {
      screen: AboutApp,
      navigationOptions: {title: 'About App'}
    },
    aboutDev: {
      screen: AboutDev,
      navigationOptions: {title: 'About Dev'}
    }
  }, 
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 20,
        marginTop: 0
      },
      tabStyle: {
        justifyContent: 'center'
      }
    }
  }
);
const aboutRoutes = StackNavigator({
  About: {
    screen: tabRoute,
    navigationOptions: (naviObject) =>  {
      const toggle = () => naviObject.navigation.navigate('DrawerToggle');
      return {
        headerLeft: <Touchable onPress={toggle}><Icon name='list' size={20}/></Touchable>,
        headerTitle: 'About'
      };
    }
  }
});
export default aboutRoutes;
