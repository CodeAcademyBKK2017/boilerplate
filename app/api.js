class ApiNotes {
    API_NOTES = 'http://localhost:4000/notes'; // fail port
    // API_NOTES = 'http://localhost:4000/notes'; //success port
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

export default new ApiNotes();
