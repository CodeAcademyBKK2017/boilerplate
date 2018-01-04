import AboutAppScreen from '../app/components/AboutApp/AboutApp.component';
import AboutDevScreen from '../app/components/AboutDev/AboutDev.component';

import {StackNavigator, TabNavigator} from 'react-navigation';
  
const AboutAppStack = StackNavigator({
  AboutAppRoot: {screen: AboutAppScreen}
}); 

const AboutDevStack = StackNavigator({
  AboutAppRoot: {screen: AboutDevScreen}
}); 

const AboutRouter = TabNavigator({
  AboutApp: {screen: AboutAppStack},
  AboutDev: {screen: AboutDevStack}
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