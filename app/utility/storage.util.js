import {AsyncStorage} from 'react-native';

const getItem = (key) => AsyncStorage.getItem(key).then(JSON.parse);
const setItem = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));
const getStore = (store) => (store.notes);

export default {setItem, getItem, getStore};