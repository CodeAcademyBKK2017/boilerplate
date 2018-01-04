import {TabNavigator} from 'react-navigation';

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

export default AboutRoutes;