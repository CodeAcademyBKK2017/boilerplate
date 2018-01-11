import AboutApp from '../components/about/aboutApp.component';
import AboutDev from '../components/about/aboutDev.vomponent';
import App from '../app';
import Icon from 'react-native-vector-icons/Foundation';
import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import {TouchableOpacity} from 'react-native';

const MyApp = TabNavigator({
  Home: {
    screen: AboutApp,
    navigationOptions: ({navigation}) => {
      const _toggleNavigate = () => navigation.navigate('DrawerToggle');
      return {
        title: 'Home',
        headerLeft: (<TouchableOpacity style={{marginLeft: 10}} onPress={_toggleNavigate}><Icon name='list' size={30}/></TouchableOpacity>)
      };
    }
  },
  Notifications: {
    screen: AboutDev
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    tabStyle: {
      justifyContent: 'center'
    },
    labelStyle: {
      fontSize: 20,
      marginTop: 0
    }
  }
});

const Nav = ({navigation}) => {
  const _toggleNavigate = () => navigation.navigate('DrawerToggle');
  return {
    title: 'About us',
    headerLeft: (<TouchableOpacity style={{marginLeft: 10}} onPress={_toggleNavigate}><Icon name='list' size={30}/></TouchableOpacity>)
  };
};
const HomeApp = StackNavigator({home: {screen: App}});
const AboutPage = StackNavigator({about: {screen: MyApp,
  navigationOptions: Nav
}});
 
const RootNavigator = DrawerNavigator({
  Home: {
    screen: HomeApp,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  About: {
    screen: AboutPage,
    navigationOptions: {
      title: 'About us',
      drawerLabel: 'About us'
    }
  }
});

export default RootNavigator;