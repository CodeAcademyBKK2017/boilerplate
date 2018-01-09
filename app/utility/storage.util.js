import {AsyncStorage} from 'react-native';

const getItemFromAsyncStorage = (key) => AsyncStorage.getItem(key).then(JSON.parse);

const setItemFromAsyncStorage = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

export default {getItemFromAsyncStorage, setItemFromAsyncStorage};