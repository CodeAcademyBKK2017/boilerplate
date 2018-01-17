import API, {host} from '../api';

describe('App', () => {
  global.fetch = jest.fn(() => new Promise((resolve) => resolve()));

  beforeEach(() => {
    global.fetch.mockClear();
  });

  it('API Get Notes: should be call fetch with url', () => {
    const expectedUrl = `${host}/notes`;
    API.getNotes();
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it('API Add Note: should be call fetch with url and some meta data.', () => {
    const note = {title: 'title', content: 'content'};

    const expectedUrl = `${host}/notes`;
    const expectedMetaData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    };

    API.addNote(note);
    expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedMetaData);
  });

  it('API Delete Note: should be call fetch with url + id and some meta data.', () => {
    const expectedId = 1;
    const expectedUrl = `${host}/notes/${expectedId}`;
    const expectedMetaData = {method: 'DELETE'};

    API.deleteNote(expectedId);
    expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedMetaData);
  });
});