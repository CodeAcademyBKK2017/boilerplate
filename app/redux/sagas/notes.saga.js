import ApiNotes from '../../api';
import StorageUtil from './../../utils/StorageUtil';
import TransformerUtil from './../../utils/TransformerUtil';
import {Alert} from 'react-native';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getNotesSelector} from '../../utils/StoreState';
import * as actions from './../../redux/actions/index.actions';

export const notesKey = 'notes';

export function* loadNotes () {
  let notes;
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    const value = yield call(StorageUtil.getItem, notesKey);
    notes = value ? value : [];
  }
  return notes;
}

export function* fetchNoteHandler () {
  yield put(actions.showLoader());
  const notes = yield call(loadNotes);

  yield put(actions.populateNotes(notes));

  yield put(actions.hideLoader());
}

export function* saveNote (note) {
  try {
    const response = yield call(ApiNotes.addNote, note);

    const oldNotes = yield select(getNotesSelector);
    const newNotes = [...oldNotes];
    newNotes.push(response);
    
    yield call(StorageUtil.setItem, notesKey, newNotes);

    yield put(actions.addNote(response));
  } catch (error) {
    yield call(
      Alert.alert, 'Save Failed',
      String(error),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    );
  }
}

export function* saveNoteHandler (action) {
  yield put(actions.showLoader());
  
  const note = action.payload;
  yield call(saveNote, note);

  yield put(actions.hideLoader());
}

export function* deleteRequestNote (id) {
  try {
    yield call(ApiNotes.deleteNote, id);

    const oldNotes = yield select(getNotesSelector);
    const filteredNotes = TransformerUtil.removeNote(oldNotes, id);
    yield call(StorageUtil.setItem, notesKey, filteredNotes);

    yield put(actions.deleteNote(id));
  } catch (error) {
    yield call(
      Alert.alert, 'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    );
  }
}

export function* deleteRequestNoteHandler (action) {
  yield put(actions.showLoader());
  
  const id = action.payload;
  yield call(deleteRequestNote, id);

  yield put(actions.hideLoader());
}

function* notesSaga () {
  yield takeLatest(actions.FETCH_NOTES, fetchNoteHandler);
  yield takeLatest(actions.SAVE_NOTE, saveNoteHandler);
  yield takeLatest(actions.DELETE_REQUEST_NOTE, deleteRequestNoteHandler);
}

export default notesSaga;
