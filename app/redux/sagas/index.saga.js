import ApiNotes from '../../api';
import StorageUtil from '../../utils/StorageUtil';
import TransformerUtil from '../../utils/TransformerUtil';
import {Alert} from 'react-native';
import {call, fork, put, select, take, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/index.actions';

function * fetchNotesHandler () {
  yield put(actions.showLoader());
  let notes = [];
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    const value = yield call(StorageUtil.getItem, 'notes');
    notes = value ? value : [];
  }
  yield put(actions.populateNotes(notes));
  yield put(actions.hideLoader());
}

function * addNoteRequestHandler (action) {
  yield put(actions.showLoader());
  const note = action.payload;
  try {
    const newNote = yield call(ApiNotes.addNote, note);
    const currentNote = yield select((store) => (store.notes));
    const notes = [...currentNote];
    notes.push(newNote);
    yield call(StorageUtil.setItem, 'notes', notes);
    yield put(actions.populateNotes(notes));
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
  yield put(actions.hideLoader());
}

function * deleteNoteRequestHandler (action) {
  yield put(actions.showLoader());
  const id = action.payload;
  try {
    yield call(ApiNotes.deleteNote, id);
    const currentNote = yield select((store) => (store.notes));
    const filteredNotes = yield call(TransformerUtil.removeNote, currentNote, id);
    yield call(StorageUtil.setItem, 'notes', filteredNotes);
    yield put(actions.populateNotes(filteredNotes));
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
  yield put(actions.hideLoader());
}

function * notes () {
  yield takeLatest(actions.DELETE_NOTE_REQUEST, deleteNoteRequestHandler);
  yield takeLatest(actions.ADD_NOTE_REQUEST, addNoteRequestHandler);
  yield take(actions.FETCH_NOTES);
  yield fetchNotesHandler();
}

function * index () {
  yield fork(notes);
}

export default index;