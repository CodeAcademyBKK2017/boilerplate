const ApiNotes = {

  getNotes: jest.fn(() => Promise.resolve([{
    key: '123',
    id: '123',
    title: 'some title',
    content: 'some content'
  }])),
  
  deleteNote: jest.fn(),
  
  addNote: jest.fn()
};

export default ApiNotes;