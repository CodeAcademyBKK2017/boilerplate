import AboutRouter from './about';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainScreen from '../app';
import React from 'react';
import Touchable from 'react-native-platform-touchable';

import {DrawerNavigator, StackNavigator} from 'react-navigation';

const MainStack = StackNavigator({
  Home: {
    screen: MainScreen,
    navigationOptions: ({navigation}) => {
      const toggleDrawer = (navigation) => () => navigation.navigate('DrawerToggle');
      return {
        title: 'Start taking notes',
        headerLeft: (<Touchable onPress={toggleDrawer(navigation)} ><Icon name='bars' size={24} /></Touchable>)
      };
    }
  }
}); 

const Router = DrawerNavigator({
  Main: {screen: MainStack},
  AboutTab: {screen: AboutRouter}
});

export default Router;