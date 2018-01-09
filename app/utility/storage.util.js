import {AsyncStorage} from 'react-native';

const getItem = (key) => AsyncStorage.getItem(key).then(JSON.parse);
const setItem = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

export default {setItem, getItem};