import Api from '../../../api';
import React from 'react';
import sagaHelper from 'redux-saga-testing';
import storageUtil from '../../../utility/storage.util';
import transformerutil from '../../../utility/transformer.util';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';

import * as actions from '../../actions/index.action';
import * as notes from '../notes.saga';

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

describe('fetchHandler success !!!', () => {
  const it = sagaHelper(notes.fetchHandler());
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('getNotes', (result) => {
    expect(result).toEqual(call(Api.getNotes));
  });
  it('populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes()));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('Should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchHandler error !!!', () => {
  const it = sagaHelper(notes.fetchHandler());
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('getNotes', (result) => {
    expect(result).toEqual(call(Api.getNotes));
    return new Error('Failed');
  });
  it('getItemFromAsyncStorage', (result) => {
    expect(result).toEqual(call(storageUtil.getItemFromAsyncStorage, 'state'));
    return ['999'];
  });
  it('populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(['999'])));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('Should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('saveHandler success !!!', () => {
  const newNote = ({
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      title: 'Title text',
      content: 'Content text',
      id: 1
    }
  });

  const it = sagaHelper(notes.saveHandler(newNote));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('noteWithID', (result) => {
    expect(result).toEqual(call(Api.addNotes, newNote.payload));
    return newNote.payload;
  });
  it('currentNotes', (result) => {
    expect(result).toEqual(select(notes.getStore));
    return [];
  });
  it('addNotes', (result) => {
    expect(result).toEqual(put(actions.addNotes(newNote.payload)));
  });
  it('setItemFromAsyncStorage', (result) => {
    expect(result).toEqual(call(storageUtil.setItemFromAsyncStorage, 'state', [newNote.payload]));
    return newNote.payload;
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('Should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('saveHandler error !!!', () => {
  const newNote = ({
    type: actions.ADD_NOTE_REQUEST,
    payload: {
      title: 'Title text',
      content: 'Content text',
      id: 1
    }
  });
  const it = sagaHelper(notes.saveHandler(newNote));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('noteWithID', (result) => {
    expect(result).toEqual(call(Api.addNotes, newNote.payload));
    return new Error('error!!!');
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('Should be end', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('deleteHandler success !!!', () => {
  const item = ({
    payload: {
      title: 'Title text',
      content: 'Content text',
      id: 1
    }
  });
  const it = sagaHelper(notes.deleteHandler(item));
  it('deleteHandler showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('deleteHandler API deleteNotes', (result) => {
    expect(result).toEqual(call(Api.deleteNotes, item.payload));
  });
  it('deleteHandler currentNotes', (result) => {
    expect(result).toEqual(select(notes.getStore));
    return [];
  });
  it('deleteHandler filterNotes', (result) => {
    expect(result).toEqual(call(transformerutil.deleteItem, [], item.payload.id));
    return 1;
  });
  it('deleteHandler deleteNotes', (result) => {
    expect(result).toEqual(put(actions.deleteNotes(1)));
  });
  it('deleteHandler setItemFromAsyncStorage', (result) => {
    expect(result).toEqual(call(storageUtil.setItemFromAsyncStorage, 'state', item.payload.id));
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('Should be end', (result) => {
    expect(result).toBeUndefined();
  });
});
  
describe('deleteHandler error !!!', () => {
  const item = ({
    payload: {
      title: 'Title text',
      content: 'Content text',
      id: 1
    }
  });
  const it = sagaHelper(notes.deleteHandler(item));
  it('deleteHandler showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('deleteHandler API deleteNotes', (result) => {
    expect(result).toEqual(call(Api.deleteNotes, item.payload));
    return new Error('999');
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
  it('Should be end', (result) => {
    expect(result).toBeUndefined();
  });

  describe('deleteHandler Store !!!', () => {
    it('Function getStore', () => {
      const store = {
        notes: 'dataNotes'
      };
      const result = notes.getStore(store);
      expect(result).toEqual('dataNotes');
    });
  });
});