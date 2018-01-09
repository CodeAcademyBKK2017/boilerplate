import {AsyncStorage} from 'react-native';

const setItemToStorage = (storageName, data) => AsyncStorage.setItem(storageName, JSON.stringify(data));

const getItemToStorage = async (storageName) => { 
  try {
    const value = await AsyncStorage.getItem(storageName);
    return JSON.parse(value); 
  } catch (e) {
    return null;
  }
};
export {
  setItemToStorage, getItemToStorage
};