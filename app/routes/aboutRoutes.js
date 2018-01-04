import {TabNavigator} from 'react-navigation';

const aboutRoutes = TabNavigator({
  aboutApp: {
    screen: () => null,
    navigationOptions: {
      title: 'About App'
    }
  },
  aboutDev: {
    screen: () => null,
    navigationOptions: {
      title: 'About Dev'
    }
      
  }
}, 
{
  swipeEnabled: true
}
);
export default aboutRoutes;
