import About from '../components/About/About.component';
import AboutDev from '../components/About/AboutDev.component';
import App from '../index';
import Icon from 'react-native-vector-icons/Foundation';
import React from 'react';
import styles from './index.style';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';

const getNaviHome = ({navigation}) => {
  const onShowNaviDrawer = () => {
    navigation.navigate('DrawerToggle');
  };
  const btn = (
    <Icon.Button iconStyle={styles.buttom} backgroundColor='transparent' color='black' name='list-thumbnails' onPress={onShowNaviDrawer} />
  );
  return {
    headerTitle: 'Home',
    headerLeft: btn
  };
};

const getNaviAboutApp = ({navigation}) => {
  const onShowNaviDrawer = () => {
    navigation.navigate('DrawerToggle');
  };
  const btn = (
    <Icon.Button iconStyle={styles.buttom} backgroundColor='transparent' color='black' name='list-thumbnails' onPress={onShowNaviDrawer} />
  );
  return {
    headerTitle: 'About App',
    tabBarLabel: 'About App',
    headerLeft: btn
  };
};

const getNaviAboutDev = ({navigation}) => {
  const onShowNaviDrawer = () => {
    navigation.navigate('DrawerToggle');
  };
  const btn = (
    <Icon.Button iconStyle={styles.buttom} backgroundColor='transparent' color='black' name='list-thumbnails' onPress={onShowNaviDrawer} />
  );
  return {
    headerTitle: 'About Dev',
    tabBarLabel: 'About Dev',
    headerLeft: btn
  };
};

const MyApp = TabNavigator({
  AboutApp: {
    screen: About,
    navigationOptions: getNaviAboutApp
  },
  AboutDev: {
    screen: AboutDev,
    navigationOptions: getNaviAboutDev
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});

const HomeNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: getNaviHome
  }
});

const AboutNavigator = StackNavigator({
  About: {
    screen: MyApp
  }
});

const MyDrawerNavigator = DrawerNavigator({
  Home: {
    screen: HomeNavigator
  },
  About: {
    screen: AboutNavigator
  }
});

export default MyDrawerNavigator;