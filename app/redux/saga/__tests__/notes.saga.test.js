import Api from '../../../api';
import React from 'react';
import sagaHelper from 'redux-saga-testing';
import storageUtil from '../../../utility/storage.util';
import transformerutil from '../../../utility/transformer.util';
import {Alert} from 'react-native';
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
  const it = sagaHelper(notes.saveHandler(noteWithID));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('noteWithID', (result) => {
    expect(result).toEqual(call(Api.addNote, noteWithID.payload));
    return {id: 1, title: 'title', content: 'content'};
  });
  it('currentNotes', (result) => {
    expect(result).toEqual(select(storageUtil.getStore));
    return [{id: 1, title: 'title', content: 'content'}];
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

describe('Error', () => {
  const item = ({
    payload: {
      title: 'Title',
      content: 'Content',
      id: 1
    }
  });
  const it = sagaHelper(notes.deleteHandler(item));
  it('showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });
  it('should Alert', (result) => {
    expect(result).toEqual(call(Alert.deleteNote, item.payload));
    return new Error('Error');
  });
  it('should Alert', (result) => {
    expect(result).toEqual(call(Alert.alert, 'Save Failed',
      String(Error),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }));
    
  });
  it('hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });
});