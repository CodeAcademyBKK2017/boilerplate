export const removeNote = (notes, id) => notes.filter((note) => note.id !== id);

export default {
  removeNote
};