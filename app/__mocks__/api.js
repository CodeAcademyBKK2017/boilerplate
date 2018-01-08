export default {
  addNote: jest.fn(),
  deleteNote: jest.fn(),
  getNotes: jest.fn(() => (Promise.resolve([])))
};