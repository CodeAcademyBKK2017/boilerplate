import {
  AsyncStorage
} from 'react-native';
  
const storage = {
  getItem: (key) => AsyncStorage.getItem(key).then((res) => JSON.parse(res)),
  setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value))
};
  
export default storage;