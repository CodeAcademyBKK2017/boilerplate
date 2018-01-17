import ApiNotes from '../api';

describe('ApiNotes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve());
  });
  
  // ----------

  it('getNotes', () => {
    const option = {
      method: 'GET'
    };

    ApiNotes.getNotes();
    
    expect(global.fetch).toHaveBeenCalledWith(ApiNotes.API_NOTES, option);
  });

  it('deleteNote', () => {
    const noteId = 1;
    const option = {
      method: 'DELETE'
    };

    ApiNotes.deleteNote(noteId);
    
    expect(global.fetch).toHaveBeenCalledWith(`${ApiNotes.API_NOTES}/${noteId}`, option);
  });

  it('addNote', () => {
    const note = {
      title: 'test title',
      content: 'test content'
    };
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    };

    ApiNotes.addNote(note);
    
    expect(global.fetch).toHaveBeenCalledWith(ApiNotes.API_NOTES, option);
  });
});
