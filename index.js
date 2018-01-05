import Router from './app/routes';
import {AppRegistry} from 'react-native';

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
  
  global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;
}

AppRegistry.registerComponent('NoteTaker', () => Router);
