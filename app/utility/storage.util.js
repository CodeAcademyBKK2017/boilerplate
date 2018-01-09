import {
  AsyncStorage
} from 'react-native';

const getItemsFromAsyncStorage = (key) => AsyncStorage.getItem(key);

const setItemsFromAsyncStorage = (key, value) => AsyncStorage.setItem(key, value);

export default {
  getItemsFromAsyncStorage, setItemsFromAsyncStorage
};