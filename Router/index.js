import About from '../app/components/About/About.component';
import App from '../app/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

const openMenu = (navigation) => () => {
  navigation.navigate('DrawerToggle');  
};
const iconMenu = (navigation) => () => {
  
};
const MyApp = DrawerNavigator({
  Home: {
    screen: StackNavigator({
      Home: {
        screen: App,
        navigationOptions: ({navigation}) => ({
          headerTitle: 'Home',
          headerLeft: <Icon name='bars'
            onPress={openMenu(navigation)}
            style={{marginLeft: 10}} size={20} color='#000' />
        })
      },
      About: {
        screen: About,
        navigationOptions: {
          headerTitle: 'About'
        }
      }
    }),
    navigationOptions: {
      drawerLabel: 'Home',
      initialRouteName: true
    }
  },
  AboutTab: {
    screen: StackNavigator({
      About: {
        screen: About,
        navigationOptions: ({navigation}) => ({
          headerTitle: 'About',
          headerLeft: <Icon name='bars'
            onPress={openMenu(navigation)}
            style={{marginLeft: 10}} size={20} color='#000' />
        })
      }
    }),
    navigationOptions: {
      drawerLabel: 'About',
      initialRouteName: true
    }
  }
});
// const RootNavigator = StackNavigator({
//   Home: {
//     screen: App,
//     navigationOptions: {
//       headerTitle: 'Home'
//     }
//   },
//   About: {
//     screen: About,
//     navigationOptions: {
//       headerTitle: 'About'
//     }
//   }
// });

export default MyApp;
