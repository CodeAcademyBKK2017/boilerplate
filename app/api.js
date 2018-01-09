import {
  AsyncStorage
} from 'react-native';

// AsyncStorage.clear();
class Api {
    onGetNote = async () => await fetch('http://localhost:3000/posts').then((res) => res.json())     
    //   await return fetch('http://localhost:3000/posts').then((res) => res.json());

    onAddNote = async (note) => {
      const apiresponse = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });
      return apiresponse;
    }

    onDelete = async (id, filteredNotes) => {
      await fetch('http://localhost:3000/posts/' + `${id}`, {
        method: 'DELETE'
      });
      return await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
    } 
}
export default new Api();