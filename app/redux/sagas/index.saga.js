import ApiNotes from '../../api';
import StorageUtil from '../../utils/StorageUtil';
import TransformerUtil from '../../utils/TransformerUtil';
import {
  Alert
} from 'react-native';
import {call, fork, put, select, take, takeLatest} from 'redux-saga/effects';

function * fetchNotesHandler () {
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

function * addNoteRequestHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  const note = action.payload;
  try {
    const newNote = yield call(ApiNotes.addNote, note);
    const currentNote = yield select((store) => (store.notes));
    const notes = [...currentNote];
    notes.push(newNote);
    yield call(StorageUtil.setItem, 'notes', notes);
    yield put({
      type: 'POPULATE_NOTES',
      payload: notes
    });
  } catch (error) {
    Alert.alert(
      'Save Failed',
      String(error),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    );
  }
  yield put({
    type: 'HIDE_LOADER'
  });
}

function * deleteNoteRequestHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  const id = action.payload;
  try {
    yield call(ApiNotes.deleteNote, id);
    const currentNote = yield select((store) => (store.notes));
    const filteredNotes = yield call(TransformerUtil.removeNote, currentNote, id);
    yield call(StorageUtil.setItem, 'notes', filteredNotes);
    yield put({
      type: 'POPULATE_NOTES',
      payload: filteredNotes
    });
  } catch (error) {
    Alert.alert(
      'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    );
  }
  yield put({
    type: 'HIDE_LOADER'
  });
}

function * notes () {
  yield takeLatest('DELETE_NOTE_REQUEST', deleteNoteRequestHandler);
  yield takeLatest('ADD_NOTE_REQUEST', addNoteRequestHandler);
  yield take('FETCH_NOTES');
  yield fetchNotesHandler();
}

function * index () {
  yield fork(notes);
}

export default index;