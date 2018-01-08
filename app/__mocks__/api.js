export default {
  addNote: jest.fn(() => Promise.resolve({
    id: 1,
    title: 'my test title',
    content: 'my test message'
  }))
};
