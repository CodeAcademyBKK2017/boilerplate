import {AsyncStorage} from 'react-native';

const getItem = (key) => AsyncStorage.getItem(key).then((data) => JSON.parse(data)).catch(() => undefined);

const setItem = (key, data) => AsyncStorage.setItem(key, JSON.stringify(data));

export default {
  getItem, 
  setItem
};