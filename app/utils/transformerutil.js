
const filterNote = (arrayNote, id) => arrayNote.filter((value) => value.id !== id);

const getSelector  = (key) => (store) => store[key]; 

export {
  filterNote,
  getSelector
};