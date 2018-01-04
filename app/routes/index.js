import AboutRoutes from './about.route';
import App from '../index';
import {StackNavigator} from 'react-navigation';

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