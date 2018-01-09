import AboutApp from '../components/About/AboutApp.component';
import AboutDevs from '../components/About/AboutDevs.component';
import {TabNavigator} from 'react-navigation';

export default TabNavigator({
  aboutApp: {
    screen: AboutApp,
    navigationOptions: {
      title: 'About the App'
    }
  },
  aboutDevs: {
    screen: AboutDevs,
    navigationOptions: {
      title: 'About the Dev'
    }
  }
}, {
  tabBarOptions: {
    upperCaseLabel: false,
    showIcon: false,
    labelStyle: {
      fontSize: 14,
      marginTop: 0
    },
    tabStyle: {
      justifyContent: 'center'
    }
  },
  swipeEnabled: true,
  animationEnabled: true
});