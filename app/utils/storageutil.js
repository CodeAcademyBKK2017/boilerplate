import {AsyncStorage} from 'react-native';

class storageutil {
  getItem = async () => JSON.parse(await AsyncStorage.getItem('notes')) || []

  setItem = async (newNotes) => {
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  }
} export default new storageutil();