import AboutScreen from './about.route';
import App from '../index';
import {StackNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      headerTitle: 'About us'
    }
  }
});

export default RootNavigator;