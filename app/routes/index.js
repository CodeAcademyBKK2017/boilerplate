import AboutApp from '../components/About/AboutApp.component';
import AboutDev from '../components/About/AboutDev.component';
import App from '../app';
import Icon from 'react-native-vector-icons/Foundation';
import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';

const MyApp = TabNavigator({
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      headerTitle: 'About App Title',
      tabBarLabel: 'About App Tab'
    }
  },
  AboutDev: {
    screen: AboutDev,
    navigationOptions: {
      headerTitle: 'About Dev Title',
      tabBarLabel: 'About Dev Tab'
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  backBehavior: 'none'
  // tabBarOptions: {
  //   activeTintColor: '#e91e63'
  // }
});

const getRootHomeNavOpt = ({navigation}) => {
  const onPressMenuButton = () => {
    navigation.navigate('DrawerToggle');
  };
  
  const MenuButton = ( // eslint-disable-next-line
    <Icon.Button name='list' color='black' iconStyle={{padding: 10}} backgroundColor='transparent' onPress={onPressMenuButton}/>
  );

  return {
    headerTitle: 'Note Taker',
    headerLeft: MenuButton
  };
};

const RootHome = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: getRootHomeNavOpt
  }
});

const RootAbout = StackNavigator({
  About: {
    screen: MyApp,
    navigationOptions: getRootHomeNavOpt
  }
});

const RootNavigator = DrawerNavigator({
  Home: {
    screen: RootHome,
    navigationOptions: {
      headerTitle: 'Note Taker'
    }
  },
  About: {
    screen: RootAbout
  }
});

export default RootNavigator;
