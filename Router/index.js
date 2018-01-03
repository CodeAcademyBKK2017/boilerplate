import AboutScreen from '../app/about';
import MainScreen from '../app/index';

import {
  StackNavigator
} from 'react-navigation';
  
const Router = StackNavigator({
  Main: {screen: MainScreen},
  About: {screen: AboutScreen}
});

export default Router;