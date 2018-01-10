import noteReducer from '../note.reducer';

it('Default Note', () => {
  const expectNotes = [];
  
  expect(noteReducer(undefined, {type: '', payload: []})).toEqual(expectNotes);
});

it('Add Note', () => {
  const note = {id: 1, title: 'title', content: 'content'};
  const expectNotes = [note];

  expect(noteReducer([], {type: 'ADD_NOTE', payload: note})).toEqual(expectNotes);
});

it('Delete Note', () => {
  const note = {id: 1, title: 'title', content: 'content'};
  const deleteNote = {id: 2, title: 'title', content: 'content'};
  const expectNotes = [note];
  
  expect(noteReducer([note, deleteNote], {type: 'DELETE_NOTE', payload: deleteNote})).toEqual(expectNotes);
});

it('Populate Notes', () => {
  const notes = [{id: 1, title: 'title', content: 'content'}];
    
  expect(noteReducer([], {type: 'POPULATE_NOTES', payload: notes})).toEqual(notes);
});