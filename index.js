import App from './app/index';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation'; // 1.0.0-beta.14

const Router = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start taking notes'
    }
  },
  About: {
    screen: () => null,
    navigationOptions: {
      title: 'About'
    }
  }
});

AppRegistry.registerComponent('NoteTaker', () => Router);