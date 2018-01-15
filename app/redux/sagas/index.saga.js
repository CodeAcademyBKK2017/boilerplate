import ApiNotes from '../../api';
import StorageUtil from '../../utils/StorageUtil';
import {call, fork, put, take} from 'redux-saga/effects';

function* fetchNotesHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  let notes = [];
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    const value = yield call(StorageUtil.getItem, 'notes');
    notes = value ? value : [];
  }
  yield put({
    type: 'POPULATE_NOTES',
    payload: notes
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}

function* notes () {
  yield take('FETCH_NOTES');
  yield fetchNotesHandler();
}

function* index () {
  yield fork(notes);
}

export default index;