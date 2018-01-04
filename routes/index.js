import AboutRouter from './about';
import MainScreen from '../app/index';

import {StackNavigator} from 'react-navigation';
  
const Router = StackNavigator({
  Main: {screen: MainScreen},
  AboutTab: {screen: AboutRouter}
});

export default Router;