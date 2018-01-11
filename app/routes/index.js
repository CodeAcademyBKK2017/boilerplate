import About from './about.routes';
import App from '../app';
import Icon from 'react-native-vector-icons/Foundation';
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
        screen: App
      },
      About: {
        screen: About
      }
    }),
    navigationOptions: ({navigation}) => ({
      headerTitle: navigation.state.routeName,
      headerLeft: (
        <TouchableOpacity style={styles.iconDrawer} onPress={onOpenDrawer(navigation)}>
          <Icon name='list' size={20} color='#333333' />
        </TouchableOpacity>
      )
    })
  }
});

/*

              DrawerNavigator

                    ||
                    vv

Home StackNavigator,    About StackNavigator
  title: Home               title: 'about'
*/

const styles = StyleSheet.create({
  iconDrawer: {
    marginLeft: 10
  }
});

export default RootNavigator;