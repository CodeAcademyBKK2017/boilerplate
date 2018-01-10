import {removeNote} from '../transformer.util';

test('', () => {
  const initialNotes = [
    {id: 1, title: 'title', content: 'content'},
    {id: 2, title: 'title', content: 'content'},
    {id: 3, title: 'title', content: 'content'}
  ];

  const expectedNotes = [
    {id: 1, title: 'title', content: 'content'},
    {id: 3, title: 'title', content: 'content'}
  ];

  expect(removeNote(initialNotes, 2)).toEqual(expectedNotes);
});