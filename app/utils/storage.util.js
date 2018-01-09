import {AsyncStorage} from 'react-native';
// Keep for references
// const getItem = (key) => AsyncStorage.getItem(key).then(JSON.parse);

const getItem = (key) => AsyncStorage.getItem(key).then((data) => JSON.parse(data));

const setItem = (key, data) => AsyncStorage.setItem(key, JSON.stringify(data));

export default {
  getItem, 
  setItem
};