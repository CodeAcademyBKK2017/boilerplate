import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import styles from './AboutDev.style';
import Touchable from 'react-native-platform-touchable';
import {Text, View} from 'react-native';

export default class AboutDevScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const toggleDrawer = (navigation) => () => navigation.navigate('DrawerToggle');
    return {
      title: 'About Developer',
      headerLeft: <Touchable onPress={toggleDrawer(navigation)}><Icon name='bars' size={24} /></Touchable>
    };
  };
      
  render () {
    return (
        
      <View style={styles.container}>
        <Text>About Developer</Text>
      </View>
    );
  }
  
}