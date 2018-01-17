import  ApiNotes from '../api';

describe('Api', () => {
  global.fetch = jest.fn(() => Promise.resolve());
  const API_NOTES = 'http://localhost:3000/notes';
  let option;
  it('ApiNotes.getNotes ', () => {
    option = {method: 'GET'};
    ApiNotes.getNotes();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenLastCalledWith(API_NOTES, option);
  });
  it('ApiNotes.deleteNote ', () => {
    option = {method: 'DELETE'};
    const id = 1;
    ApiNotes.deleteNote(id);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenLastCalledWith(`${API_NOTES}/${id}`, option);
  });
  it('ApiNotes.addNote ', () => {
    const note = [{id: 1}];
    option = {method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)};
    ApiNotes.addNote(note);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenLastCalledWith(API_NOTES, option);
  });
});