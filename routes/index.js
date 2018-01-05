import About from './about.routes';
import Icon from 'react-native-vector-icons/Foundation';
import Main from '../app/index';
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const onOpenDrawer = (navigation) => () => navigation.navigate('DrawerToggle');

const RootNavigator = StackNavigator({
  Main: {
    screen: DrawerNavigator({
      Main: {
        screen: Main
      },
      About: {
        screen: About
      }
    }),
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Start taking notes.',
      headerLeft: (
        <TouchableOpacity style={styles.iconDrawer} onPress={onOpenDrawer(navigation)}>
          <Icon name='list' size={20} color='#333333' />
        </TouchableOpacity>
      )
    })
  }
});

const styles = StyleSheet.create({
  iconDrawer: {
    marginLeft: 10
  }
});

export default RootNavigator;