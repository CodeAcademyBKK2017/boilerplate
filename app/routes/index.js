import App from '../index';
import {StackNavigator, TabNavigator} from 'react-navigation';

const AboutRoutes = TabNavigator(
  {
    aboutApp: {
      screen: () => null,
      navigationOptions: {
        title: 'About the App'
      }
    },
    aboutDevs: {
      screen: () => null,
      navigationOptions: {
        title: 'About the Creators'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#007AFF',
      labelStyle: {
        fontSize: 16
      }
    },
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom'
  }
);

const Router = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start taking notes'
    }
  },
  About: {
    screen: AboutRoutes
  }
});

export default Router;