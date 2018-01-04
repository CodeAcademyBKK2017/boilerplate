import AboutAppScreen from '../app/components/AboutApp/AboutApp.component';
import AboutDevScreen from '../app/components/AboutDev/AboutDev.component';

import {TabNavigator} from 'react-navigation';
  
const AboutRouter = TabNavigator({
  AboutApp: {screen: AboutAppScreen},
  AboutDev: {screen: AboutDevScreen}
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    tabStyle: {
      justifyContent: 'center'
    },
    labelStyle: {
      marginTop: 0,
      fontSize: 14
    }
  }
});

export default AboutRouter;