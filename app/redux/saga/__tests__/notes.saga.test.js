import Api from '../../../api';
import React from 'react';
import sagaHelper from 'redux-saga-testing';
import storageUtil from '../../../utility/storage.util';
import transformerutil from '../../../utility/transformer.util';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions/index.actions';
import * as notes from '../notes.saga';

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

describe('notes saga: should be work in every case', () => {
  const it = sagaHelper(notes.default());
  it('notes func be takeEvery a newFun func', (result) => {
    expect(result).toEqual(takeEvery(actions.FETCH_NOTE, notes.fetchHandler));
  });
  it('notes func be takeEvery a addDataWithSaga func', (result) => {
    expect(result).toEqual(takeLatest(actions.ADD_NOTE_REQUEST, notes.saveHandler));
  });
  it('notes func be takeEvery a deleteDataWithSaga func', (result) => {
    expect(result).toEqual(takeLatest(actions.DELETE_NOTE_REQUEST, notes.deleteHandler));
  });
  it('And then nothing happen', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchHandler success', () => {
  const it = sagaHelper(notes.fetchHandler());
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('getNote', (result) => {
    expect(result).toEqual(call(Api.getNote));
  });
  it('populateNote', (result) => {
    expect(result).toEqual(put(actions.populateNote()));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchHandler failure', () => {
  const it = sagaHelper(notes.fetchHandler());
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('getNote', (result) => {
    expect(result).toEqual(call(Api.getNote));
    return new Error('failed');
  });
  it('failed', (result) => {
    expect(result).toEqual(call(storageUtil.getItem, 'notes'));
    return ['3'];
  });
  it('populateNote', (result) => {
    expect(result).toEqual(put(actions.populateNote(['3'])));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('saveHandler success', () => {
  const noteWithID = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      id: 1,
      title: 'title',
      content: 'content'
    }
  };
  const note = {id: 1, title: 'title', content: 'content'};
  const it = sagaHelper(notes.saveHandler(noteWithID));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('noteWithID', (result) => {
    expect(result).toEqual(call(Api.addNote, noteWithID.payload));
    return note;
  });
  it('currentNotes', (result) => {
    expect(result).toEqual(select(storageUtil.getStore));
    return [note];
  });
  it('call setItem', (result) => {
    expect(result).toEqual(call(storageUtil.setItem, 'notes', [noteWithID.payload, noteWithID.payload]));
  });
  it('addNote', (result) => {
    expect(result).toEqual(put(actions.addNote(noteWithID.payload)));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('saveHandler failed', () => {
  const noteNote = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      id: 1,
      title: 'title',
      content: 'content'
    }
  };
  const it = sagaHelper(notes.saveHandler(noteNote));
    
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
    
  it('Making api call add note', (result) => {
    expect(result).toEqual(call(Api.addNote, noteNote.payload));
    return new Error('Something went wrong');
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('deleteHandler success', () => {
  const noteWithID = {
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      id: 1,
      title: 'title',
      content: 'content'
    }
  };
  const it = sagaHelper(notes.deleteHandler(noteWithID));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('deleteNote', (result) => {
    expect(result).toEqual(call(Api.deleteNote, noteWithID.payload));
  });
  it('currentNotes', (result) => {
    expect(result).toEqual(select(storageUtil.getStore));
    return [];
  });
  it('filterNotes', (result) => {
    expect(result).toEqual(call(transformerutil.deleteItem, [], noteWithID.payload));
    return 1;
  });
  it('populateNote', (result) => {
    expect(result).toEqual(put(actions.populateNote(noteWithID.payload.id)));
  });
  it('call setItem', (result) => {
    expect(result).toEqual(call(storageUtil.setItem, 'notes', noteWithID.payload.id));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});

describe('deleteHandler failed', () => {
  const noteNote = {
    type: actions.DELETE_NOTE_REQUEST,
    payload: {
      id: 1,
      title: 'title',
      content: 'content'
    }
  };
  const it = sagaHelper(notes.deleteHandler(noteNote));
    
  it('Should show loader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
    
  it('Making api call delete note', (result) => {
    expect(result).toEqual(call(Api.deleteNote, noteNote.payload));
    return new Error('Something went wrong');
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('should be end', (result) => {
    expect(result).toBeUndefined();
  });
});