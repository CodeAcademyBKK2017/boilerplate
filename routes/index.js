import About from './about.routes';
import Icon from 'react-native-vector-icons/Foundation';
import Main from '../app/index';
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {
  TouchableOpacity
} from 'react-native';

const RootNavigator = StackNavigator({
  Main: {
    screen: DrawerNavigator({
      Main: {
        screen: Main
      },
      Notifications: {
        screen: About
      }
    }),
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Start taking notes.',
      headerLeft: (
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('DrawerToggle')}>
          <Icon name='list' size={20} color='#333333' />
        </TouchableOpacity>
      )
    })
  }
});

export default RootNavigator;