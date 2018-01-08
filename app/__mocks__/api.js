export default {
  getNotes: jest.fn(() => ([
    {id: 0, title: 'someTitle', content: 'someContent'}
  ])),
  addNote: jest.fn(() => ({
    id: 1,
    title: 'someTitle',
    content: 'someContent'
  })),
  deleteNote: jest.fn()
};