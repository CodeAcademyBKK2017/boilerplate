import AboutRoutes from './about.routes.js';
import App from '../index';
import {StackNavigator} from 'react-navigation'; // 1.0.0-beta.14

const Router = StackNavigator({
  Main: {
    screen: App,
    navigationOptions: {
      title: 'Start taking notes'
    }
  },
  About: {
    screen: AboutRoutes
  }
});

export default Router;