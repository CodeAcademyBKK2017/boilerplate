import {
  Alert, AsyncStorage
} from 'react-native';

// AsyncStorage.clear();
class Api {
    onGetNote = async () => {
      try {
        return await  fetch('http://localhost:3000/posts').then((res) => res.json());
      } catch (error) {
        return false;
      }
    //   await return fetch('http://localhost:3000/posts').then((res) => res.json());
    }  

    onAddNote = async (note) => {
        await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
        });

    onDelete = async (id, filteredNotes) => {
      try {
        await fetch('http://localhost:3000/posts/' + `${id}`, {
          method: 'DELETE'
        });
        await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
        return true;
      } catch (error) {
        // console.log(error, 'delete error :: ');
        Alert.alert(
          'Error',
          'Internet error',
          {cancelable: true}
        );
        return false;
      }
    } 
}

export default new Api;