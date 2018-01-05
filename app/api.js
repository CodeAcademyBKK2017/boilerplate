const dbHost = 'http://localhost:3000';

const getNotes = () => fetch(dbHost + '/notes').then((data) => data.json());

const addNotes = (notes) => {
  fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notes)
  });
};

const deleteNotes = (id) => fetch(dbHost + `/notes/${id}`, {method: 'DELETE'});

export default {getNotes, addNotes, deleteNotes};