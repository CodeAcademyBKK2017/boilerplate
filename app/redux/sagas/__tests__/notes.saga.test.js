import sagaHelper from 'redux-saga-testing';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as actions from './../../../redux/actions/index.actions';
import * as notesSagas from '../notes.saga';

// test case
describe('notesSaga', () => {
  const it = sagaHelper(notesSagas.default());

  it('should take function fetchNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.FETCH_NOTES, notesSagas.fetchNoteHandler));
  });

  it('should take function saveNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.SAVE_NOTE, notesSagas.saveNoteHandler));
  });

  it('should take function deleteRequestNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.DELETE_REQUEST_NOTE, notesSagas.deleteRequestNoteHandler));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});
