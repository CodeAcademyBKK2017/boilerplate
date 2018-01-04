import AboutScreen from './about.route';
import App from '../index';
import Icon from 'react-native-vector-icons/Foundation';
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {TouchableOpacity} from 'react-native';

const Nav = ({navigation}) => {
  const _toggleNavigate = () => navigation.navigate('DrawerToggle');
  return {
    title: 'About us',
    headerLeft: (<TouchableOpacity style={{marginLeft: 10}} onPress={_toggleNavigate}><Icon name='list' size={30}/></TouchableOpacity>)
  };
};
const HomeApp = StackNavigator({home: {screen: App}});
const AboutPage = StackNavigator({about: {screen: AboutScreen,
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