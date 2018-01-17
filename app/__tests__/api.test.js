import ApiNotes from '../api';

describe('Api', () => {
  global.fetch = jest.fn(() => new Promise((resolve) => resolve()));

  beforeEach(() => {
    global.fetch.mockClear();
  });

  it('API Get Notes: should be call fetch with url', () => {
    ApiNotes.getNotes();
    expect(fetch).toHaveBeenCalled();
  });
  it('API Delete Notes: should be call fetch with url', () => {
    ApiNotes.deleteNote();
    expect(fetch).toHaveBeenCalled();
  });
  it('API Add Notes: should be call fetch with url', () => {
    ApiNotes.addNote();
    expect(fetch).toHaveBeenCalled();
  });
});