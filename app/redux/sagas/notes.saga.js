import ApiNotes from '../../api';
import StorageUtil from '../../utils/StorageUtil';
import TransformerUtil from '../../utils/TransformerUtil';
import {Alert} from 'react-native';
import {call, put, select, take, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/index.actions';

const keyStoreNotes = 'notes';

export const selectFilters = (store) => (store.notes);

export function * fetchNotesHandler () {
  yield put(actions.showLoader());
  let notes = [];
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    const value = yield call(StorageUtil.getItem, keyStoreNotes);
    notes = value ? value : [];
  }
  yield put(actions.populateNotes(notes));
  yield put(actions.hideLoader());
}

export function * addNoteRequestHandler (action) {
  yield put(actions.showLoader());
  const note = action.payload;
  try {
    const newNote = yield call(ApiNotes.addNote, note);
    const currentNote = yield select(selectFilters);
    const notes = [...currentNote];
    notes.push(newNote);
    yield call(StorageUtil.setItem, keyStoreNotes, notes);
    yield put(actions.populateNotes(notes));
  } catch (error) {
    yield call(Alert.alert,
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
  yield put(actions.hideLoader());
}

export function * deleteNoteRequestHandler (action) {
  yield put(actions.showLoader());
  const id = action.payload;
  try {
    yield call(ApiNotes.deleteNote, id);
    const currentNote = yield select(selectFilters);
    const filteredNotes = yield call(TransformerUtil.removeNote, currentNote, id);
    yield call(StorageUtil.setItem, keyStoreNotes, filteredNotes);
    yield put(actions.populateNotes(filteredNotes));
  } catch (error) {
    yield call(Alert.alert,
      'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    );
  }
  yield put(actions.hideLoader());
}

export default function * notes () {
  yield takeLatest(actions.DELETE_NOTE_REQUEST, deleteNoteRequestHandler);
  yield takeLatest(actions.ADD_NOTE_REQUEST, addNoteRequestHandler);
  yield take(actions.FETCH_NOTES);
  yield fetchNotesHandler();
}