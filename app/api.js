const dbHost = 'http://localhost:3000';

const getNotes = () => fetch(dbHost + '/notes').then((data) => data.json());

const addNote = (notes) => fetch(dbHost + '/notes', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(notes)
}).then((res) => res.json());

const deleteNote = (id) => fetch(dbHost + `/notes/${id}`, {method: 'DELETE'});

export default {getNotes, addNote, deleteNote};