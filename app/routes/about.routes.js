import {TabNavigator} from 'react-navigation'; // 1.0.0-beta.14

export default TabNavigator({
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
}, {
  tabBarOptions: {
    upperCaseLabel: false,
    showIcon: false
  },
  swipeEnabled: true,
  animationEnabled: true
});