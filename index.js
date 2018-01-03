import App from './app/index';
import {AppRegistry} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

const Router = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start Taker Note'
    }
  },
  About: {
    screen: () => null,
    navigationOptions: {
      title: 'About Taker Note'
    }
  }
});

AppRegistry.registerComponent('NoteTaker', () => Router);
