import AboutRoutes from './about.routes.js';
import App from '../app';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {StyleSheet, Text} from 'react-native';

const openDrawer = (navigation) => () => {
  navigation.navigate('DrawerOpen');
};
 
const DrawerStack = DrawerNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Home'
    }
  },
  About: {
    screen: AboutRoutes
  }
});

const Router = StackNavigator(
  {
    drawerStack: {screen: DrawerStack}
  },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: <Text style={styles.menu} onPress={openDrawer(navigation)}><Icon name='menu' size={30} color='grey'/></Text>
    })
  }
);

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10
  }
});

export default Router;