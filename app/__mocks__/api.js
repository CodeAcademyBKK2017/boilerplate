export default {
  addNote: jest.fn(() => Promise.resolve()),
  deleteNote: jest.fn(() => Promise.resolve()),
  getNotes: jest.fn(() => Promise.resolve('[{title: "some",content: "some",key: "123"}]'))
};