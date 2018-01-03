import App from './app/index';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';

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

// AppRegistry.registerComponent('NoteTaker', () => App);
AppRegistry.registerComponent('NoteTaker', () => Router);
