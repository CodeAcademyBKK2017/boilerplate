import ApiNotes from '../../api';
import StorageUtil from './../../utils/StorageUtil';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';

const notesKey = 'notes';

function* loadNotes () {
  let notes;
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    const value = yield call(StorageUtil.getItem, notesKey);
    notes = value ? value : [];
  }
  return notes;
}

function* fetchNoteHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  
  // const notes = yield loadNotes();
  const notes = yield call(loadNotes);

  yield put({
    type: 'POPULATE_NOTES',
    payload: notes
  });

  yield put({
    type: 'HIDE_LOADER'
  });
}

function* notesSaga () {
  yield takeLatest('FETCH_NOTES', fetchNoteHandler);
}

export default notesSaga;
