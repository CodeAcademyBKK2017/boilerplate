class Tranformerutil {
  removeNote (afterDel, id) {
    return afterDel.filter((note) => note.id !== id);
  }
} export default new Tranformerutil();