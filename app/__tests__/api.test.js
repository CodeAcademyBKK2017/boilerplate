import Api from '../api';

describe('App', () => {
  global.fetch = jest.fn(() => new Promise((resolve) => resolve()));

  beforeEach(() => {
    global.fetch.mockClear();
  });

  it('Api Get Notes: should be call fetch with url', () => {
    const expectedUrl = 'http://localhost:3000/notes';
    Api.getNote();
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it('Api Add Note: should be call fetch with url and some meta data.', () => {
    const note = {title: 'title', content: 'content'};

    const expectedUrl = 'http://localhost:3000/notes';
    const expectedMetaData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    };

    Api.addNote(note);
    expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedMetaData);
  });

  it('Api Delete Note: should be call fetch with url + id and some meta data.', () => {
    const item = 1;
    const expectedUrl = `http://localhost:3000/notes/${item.id}`;
    const expectedMetaData = {method: 'DELETE'};

    Api.deleteNote(item);
    expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedMetaData);
  });
});