import AboutRouter from './about';
import MainScreen from '../index';

import {DrawerNavigator, StackNavigator} from 'react-navigation';

const MainStack = StackNavigator({
  Home: {screen: MainScreen}
}); 

const Router = DrawerNavigator({
  Main: {screen: MainStack},
  AboutTab: {screen: AboutRouter}
});

export default Router;