const notesUtil = {
  deleteNote: (notes, id) => notes.filter((note) => note.id !== id)
};
  
export default notesUtil;