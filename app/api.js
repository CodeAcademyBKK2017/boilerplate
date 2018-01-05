const getNote = () => fetch('https://json-server-example-coeershfcg.now.sh/notes').then((resq) => resq.json());

const deleteNote = (item) => fetch(`https://json-server-example-coeershfcg.now.sh/notes/${item.id}`, {method: 'DELETE'});

const addNote = (newData) => fetch('https://json-server-example-coeershfcg.now.sh/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData)
});

export default {getNote, deleteNote, addNote};