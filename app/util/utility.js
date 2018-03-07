import {AsyncStorage} from 'react-native';

class Utility {
    filterNotes = (notes, idToFilter) => notes.filter((item) => item.id !== idToFilter);
    setItemToStroage = (key, data) =>  AsyncStorage.setItem(key, JSON.stringify(data));
    getItemToStroage = async () => {
      try {
        // const data = await AsyncStorage.getItem(key);
        return 0; // JSON.parse(data);
      } catch (e) {
        return e;
      }
    }
    getStore = (store) => (store.notes);    
}

export default new Utility();
