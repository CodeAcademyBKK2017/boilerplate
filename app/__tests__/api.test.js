import Api from '../api';
import React from 'react';

describe('Api', () => {

  beforeEach(() => {
    global.fetch.mockClear();
  });

  global.fetch = jest.fn(() => new Promise((resolve) => resolve()));

  it('Function getNotes', () => {
    const expectUrl = 'http://localhost:3000/notes';
    Api.getNotes();
    expect(fetch).toHaveBeenCalledWith(expectUrl);
  });

  it('Function deleteNotes', () => {
    const item = {id: 1};
    const expectUrl = `http://localhost:3000/notes/${item.id}`;
    const expectMetaData = {method: 'DELETE'};
    Api.deleteNotes(item);
    expect(fetch).toHaveBeenCalledWith(expectUrl, expectMetaData);
  });

  it('Function addNotes', () => {
    const note = {title: 'titleText', content: 'contentText'};
    const expectUrl = 'http://localhost:3000/notes';
    const expectMetaData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    };
    Api.addNotes(note);
    expect(fetch).toHaveBeenCalledWith(expectUrl, expectMetaData);
  });
});