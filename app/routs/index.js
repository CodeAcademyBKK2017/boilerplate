import App from '../index';
import theme from './theme.style';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

const AboutRoutes = TabNavigator({
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
    showIcon: false,
    style: {
      backgroundColor: 'white'
    },
    activeTintColor: theme.ACTIVE_TAB_COLOR,
    inactiveTintColor: theme.INACTIVE_TAB_COLOR,
    labelStyle: {
      fontSize: 14
    }
  },
  swipeEnabled: true,
  animationEnabled: true,
  tabBarPosition: 'bottom'
  
});

const Router = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start Taker Note'
    }
  },
  About: {
    screen: AboutRoutes
  }
}, {
  mode: 'card'
});

export default Router;