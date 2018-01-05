export default class ApiNotes {
  API_NOTES = 'http://localhost:3000/notes';

  getNotes = () => {
    const option = {
      method: 'GET'
    };
    return fetch(this.API_NOTES, option)
      .then((response) => response.json());
  }

  deleteNote = (id) => {
    const option = {
      method: 'DELETE'
    };
    return fetch(`${this.API_NOTES}/${id}`, option)
      .then((response) => response.json());
  }

  addNote = (note) => {
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    };
    return fetch(this.API_NOTES, option)
      .then((response) => response.json());
  }
}