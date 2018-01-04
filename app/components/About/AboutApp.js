import React from 'react';
import {
  Text
} from 'react-native';
  
export default class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'APP'
    };
    render () {
      return (
        <Text>APP</Text>
        // <Button
        //   onPress={() => this.props.navigation.goBack()}
        //   title='Go back home'
        // />
      );
    }
}
