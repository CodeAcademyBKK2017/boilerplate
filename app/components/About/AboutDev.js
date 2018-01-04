import React from 'react';
import {
  Text
} from 'react-native';
  
export default class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'DEV'
    };
    render () {
      return (
        <Text>DEV</Text>
        // <Button
        //   onPress={() => this.props.navigation.goBack()}
        //   title='Go back home'
        // />
      );
    }
}
