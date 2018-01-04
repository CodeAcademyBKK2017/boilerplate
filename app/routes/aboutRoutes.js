import AboutApp from '../components/About/AboutApp.component';
import AboutDev from '../components/About/AboutDev.component';
import {TabNavigator} from 'react-navigation';

const aboutRoutes = TabNavigator(
  {
    aboutApp: {
      screen: AboutApp,
      navigationOptions: {title: 'About App'}
    },
    aboutDev: {
      screen: AboutDev,
      navigationOptions: {title: 'About Dev'}
    }
  }, 
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 20,
        marginTop: 0
      },
      tabStyle: {
        justifyContent: 'center'
      }
    }
  }
);
export default aboutRoutes;
