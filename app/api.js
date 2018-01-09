const getNotes = () => fetch('http://localhost:3000/notes').then((data) => data.json());

const deleteNotes = (item) => fetch(`http://localhost:3000/notes/${item.id}`, {method: 'DELETE'});

const addNotes = (newData) => fetch('http://localhost:3000/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData)
}).then((data) => data.json());

export default {getNotes, deleteNotes, addNotes};