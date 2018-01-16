import API from '../../api';
import SnackBar from 'react-native-snackbar';
import StorageUtil from '../../utils/storage.util';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {removeNote} from '../../utils/transformer.util';
import * as actions from '../../redux/actions/index.actions';

const warningBar = () => ({
  title: 'Network errors: Can\'t connect to server.',
  duration: 3000,
  backgroundColor: '#d9bf56'
});

function* fetchNoteHandler () {
  yield put(actions.showLoader());

  let notes = [];
  try {
    notes = yield call(API.getNotes);
  } catch (e) {
    notes = yield call(StorageUtil.getItem, 'notes') || [];
    SnackBar.show(warningBar());
  }
  
  yield put(actions.populateNotes(notes));
  yield put(actions.hideLoader());
}

function* addNoteHandler (action) {
  yield put(actions.showLoader());

  try {
    const newNoteWithID = yield call(API.addNote, action.payload);
    
    const newNotes = [...yield select((store) => (store.notes)), newNoteWithID];
    yield call(StorageUtil.setItem, 'notes', newNotes);

    yield put(actions.addNote(newNoteWithID));
    
  } catch (e) {
    SnackBar.show(warningBar());
  }

  yield put(actions.hideLoader());
} 

function* deleteNoteHandler (action) {
  yield put(actions.showLoader());

  try {
    yield call(API.deleteNote, action.payload.id);

    const newNotes = removeNote(yield select((store) => (store.notes)), action.payload);
    yield call(StorageUtil.setItem, 'notes', newNotes);
  
    yield put(actions.deleteNote(action.payload));
  } catch (e) {
    SnackBar.show(warningBar());
  }

  yield put(actions.hideLoader());
}
  
export default function* notes () {
  yield takeEvery('FETCH_NOTES', fetchNoteHandler);
  yield takeEvery('ADD_NOTE_REQUEST', addNoteHandler);
  yield takeEvery('DELETE_NOTE_REQUEST', deleteNoteHandler);
}