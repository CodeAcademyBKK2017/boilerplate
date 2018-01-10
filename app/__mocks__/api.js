export default {
  getNotes: jest.fn(() => Promise.resolve([
    {
      id: 1,
      title: 'my test title',
      content: 'my test message'
    }
  ])),

  deleteNote: jest.fn(() => Promise.resolve()),
  
  addNote: jest.fn(() => Promise.resolve())
};
