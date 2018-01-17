import API from '../api';

describe('App', () => {
  global.fetch = jest.fn(() => new Promise((resolve) => resolve()));

  beforeEach(() => {
    global.fetch.mockClear();
  });

  it('onGetNote', () => {
    const url = 'http://localhost:3000/posts';
    API.onGetNote();
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('onDelete', () => {
    const url = 'http://localhost:3000/posts/';
    const id = 1;
    API.onDelete(id);
    expect(fetch).toHaveBeenCalledWith(url + id, {
      method: 'DELETE'
    });
  });

  it('onAddNote', () => {
    const url = 'http://localhost:3000/posts';
    const note = {
      title: 'titel',
      content: 'content'
    };
    API.onAddNote(note);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  });
});