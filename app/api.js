export const host = 'http://localhost:3000';

const getNotes = () => fetch(`${host}/notes`).then((data) => data.json());

const addNote = (notes) => fetch(`${host}/notes`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(notes)
}).then((res) => res.json());

const deleteNote = (id) => fetch(`${host}/notes/${id}`, {method: 'DELETE'});

export default {getNotes, addNote, deleteNote};