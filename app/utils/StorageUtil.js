import {AsyncStorage} from 'react-native';

class StorageUtil {
  getItem = (key) => AsyncStorage.getItem(key).then((data) => JSON.parse(data)).catch(() => (null));
  setItem = (key, item) => AsyncStorage.setItem(key, JSON.stringify(item))
}

export default new StorageUtil();