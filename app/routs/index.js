import AboutApp from '../components/About/AboutApp.component';
import AboutDev from '../components/About/AboutDev.component';
import App from '../index';
import theme from './theme.style';
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from 'react-navigation';

const AboutRoutes = TabNavigator({
  aboutApp: {
    screen: AboutApp,
    navigationOptions: {
      title: 'About the App'
    }
  },
  aboutDevs: {
    screen: AboutDev,
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

const HomeRouter = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start Taker Note'
    }
  }
});

const MyApp = DrawerNavigator({
  Home: {
    screen: HomeRouter
  },
  About: {
    screen: AboutRoutes,
    navigationOptions: {
      title: 'About'
    }
  }
});

export default MyApp;