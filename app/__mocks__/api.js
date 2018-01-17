export default {
  API_NOTES: 'http://localhost:3000/notes',
  getNotes: jest.fn(() => Promise.resolve([])),
  deleteNote: jest.fn(),
  addNote: jest.fn(() => Promise.resolve({
    id: 1,
    title: 'my test title',
    content: 'my test message'
  }))
};
