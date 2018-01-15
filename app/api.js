const getNote = () => fetch('http://localhost:3000/notes').then((resq) => resq.json());

const deleteNote = (item) => fetch(`http://localhost:3000/notes/${item.id}`, {method: 'DELETE'});

const addNote = (newData) => fetch('http://localhost:3000/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData)
}).then((res) => res.json());

export default {getNote, deleteNote, addNote};