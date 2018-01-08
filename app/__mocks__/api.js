export default {
  addNote: jest.fn(() => {
    console.log('from mock api');
  }),
  deleteNote: jest.fn(() => {
    console.log('from mock api');
  })
};