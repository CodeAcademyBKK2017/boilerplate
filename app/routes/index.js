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
 
  // Main: {
  //   screen: App,
  //   navigationOptions: ({navigation}) => ({
  //     title: 'Start taking notes',
  //     headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}><Icon name='menu' fontSize='100px' color='grey'/></Text>
  //   })
  // },
  // About: {
  //   screen: AboutRoutes
  // }
);

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10
  }
});

export default Router;