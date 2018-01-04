import AboutRoutes from './about.route';
import App from '../index';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {
  Text
} from 'react-native';

const openDrawer = (navigation) => () => {
  navigation.navigate('DrawerOpen');
};

const DrawerStack = DrawerNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start taking notes'
    }
  },
  About: {
    screen: AboutRoutes
  }
});

const styleHamburger = {
  paddingLeft: 20
};

const styleSettings = {
  paddingRight: 20
};

const Router = StackNavigator(
  {
    drawerMenu: {screen: DrawerStack}
  },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'green'
      },
      title: 'Start taking notes',
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: <Text style={styleHamburger} onPress={openDrawer(navigation)}><Icon name='menu' size={22} color='#fff' /></Text>,
      headerRight: <Text style={styleSettings} ><Icon name='settings' size={22} color='#fff' /></Text>
    })
  }
);

// const Router = StackNavigator(
//   {
//     Main: {
//       screen: App,
//       navigationOptions: {
//         title: 'Start taking notes'
//       }
//     },
//     About: {
//       screen: AboutRoutes
//     }
//   }
// );

export default Router;