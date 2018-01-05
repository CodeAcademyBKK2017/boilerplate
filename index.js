import Routes from './app/routes/index';
import {AppRegistry} from 'react-native';

global.XMLHttpRequest = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
global.FormData = global.originalFormData ?
  global.originalFormData :
  global.FormData;

AppRegistry.registerComponent('NoteTaker', () => Routes);