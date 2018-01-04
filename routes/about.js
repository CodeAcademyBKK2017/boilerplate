import AboutAppScreen from '../app/about-app';
import AboutDevScreen from '../app/about-dev';

import {TabNavigator} from 'react-navigation';
  
const AboutRouter = TabNavigator({
  AboutApp: {screen: AboutAppScreen},
  AboutDev: {screen: AboutDevScreen}
}, {
  swipeEnabled: true,
  animationEnabled: true
});

export default AboutRouter;