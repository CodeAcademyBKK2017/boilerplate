export default {
  getNote: jest.fn(() => Promise.resolve([{
    title: 'React Native',
    content: '- UI'
  }])),
  deleteNote: jest.fn(),
  addNote: jest.fn()
};