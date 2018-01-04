import AboutApp from '../components/About/AboutApp.component.js';
import AboutDevs from '../components/About/AboutDevs.component.js';
import {TabNavigator} from 'react-navigation';

const AboutRoutes = TabNavigator(
  {
    aboutApp: {
      screen: AboutApp,
      navigationOptions: {
        title: 'About the App'
      }
    },
    aboutDevs: {
      screen: AboutDevs,
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

export default AboutRoutes;