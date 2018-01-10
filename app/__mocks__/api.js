export default {
  addNote: jest.fn(() => Promise.resolve([{title: 'some', content: 'some', id: 1}])),
  deleteNote: jest.fn(() => Promise.resolve()),
  getNotes: jest.fn(() => Promise.resolve([{title: 'some', content: 'some', id: 1}]))
};