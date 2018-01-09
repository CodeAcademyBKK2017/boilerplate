class TransformerUtil {
  removeNote = (notes, id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    return filteredNotes;
  }
}

export default new TransformerUtil();
