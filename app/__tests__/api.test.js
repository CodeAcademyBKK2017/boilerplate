import ApiNotes from '../api';

describe('API TEST', () => {
  global.fetch = jest.fn(() => Promise.resolve());
  const API_NOTES = 'http://localhost:3000/notes';

  it('API ADDNOTE will work', async () => {
    const option = {
      method: 'GET'
    };
    ApiNotes.getNotes();
    
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(API_NOTES, option);
  });
  it('API deleteNote will work', async () => {
    const option = {
      method: 'DELETE'
    };
    ApiNotes.deleteNote(1);
    
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`${API_NOTES}/${1}`, option);
  });
  it('API addNote will work', async () => {
    const option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: '111'})
    };
    ApiNotes.addNote({title: '111'});
    
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(API_NOTES, option);
  });

});