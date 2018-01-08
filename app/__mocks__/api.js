export default {
  getNotes: jest.fn(() => Promise.resolve([{
    title: 'React Native',
    content: '- UI',
    key: 0,
    id: 1
  }])),
  deleteNotes: jest.fn(() => Promise.resolve()),
  addNotes: jest.fn(() => Promise.resolve())
};