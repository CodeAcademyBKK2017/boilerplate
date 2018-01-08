export default {
  getNotes: jest.fn(),
  addNote: jest.fn(() => ({
    id: 1,
    title: 'someTitle',
    content: 'someContent'
  })),
  deleteNote: jest.fn()
};