import {
  AsyncStorage
} from 'react-native';
  
const storage = {
  getItem: (key) => AsyncStorage.getItem(key).then((response) => JSON.parse(response)),
  setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value))
};
  
export default storage;