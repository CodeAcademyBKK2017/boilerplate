import AboutAppScreen from '../app/about-app';
import AboutDevScreen from '../app/about-dev';
import AboutScreen from '../app/about';
import MainScreen from '../app/index';

import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
  
const Router = StackNavigator({
  Main: {screen: MainScreen},
  About: {screen: AboutScreen},
  AboutTab: {
    screen: TabNavigator({
      AboutApp: {screen: AboutAppScreen},
      AboutDev: {screen: AboutDevScreen}
    }, {
      swipeEnabled: true,
      animationEnabled: true
    })
  }
});

export default Router;