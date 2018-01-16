import ApiNotes from '../../api';
import {Alert} from 'react-native';
import {call, fork, put,  select, take, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {filterNote} from '../../utils/transformerutil';
import {getItemToStorage, setItemToStorage} from '../../utils/storageutil';
import * as actions from '../actions/index.actions';

function* fetchHandler () {
  yield put(actions.showLoader());
  yield delay(2000);
  let response;
  try {
    response = yield call(ApiNotes.getNotes);
  } catch (error) {
    const storageData =  yield call(getItemToStorage, 'storageNote');
    response = storageData ? storageData : [];
  }
  yield put(actions.populateNotes(response));
  yield put(actions.hideLoader());
}
function* addNoteHandler (action) {
  yield put(actions.showLoader());
  try {
    const note = action.payload;
    const noteWithId = yield call(ApiNotes.addNote, note);
    const currentNote = yield select((store) => (store.notes));
    const newNote = [...currentNote, noteWithId];
    yield put(actions.addNote(noteWithId)); 
    yield call(setItemToStorage, 'storageNote', newNote);
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
function* deleteNoteHandler (action) {
  yield put(actions.showLoader());
  try {
    const itemId = action.payload;
    yield call(ApiNotes.deleteNote, itemId);
    yield put(actions.deleteNote(itemId)); 
    const currentNote = yield select((store) => (store.notes));
    const remainNote = filterNote(currentNote, itemId);
    yield call(setItemToStorage, 'storageNote', remainNote);
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
function* notes () {
  yield take(actions.fetchNotes);
  yield fetchHandler();

  yield takeLatest(actions.ADD_NOTE_REQUEST, addNoteHandler);
  yield takeLatest(actions.DELETE_NOTE_REQUEST, deleteNoteHandler);
}
export default function* sagas () {
  yield fork(notes);
  // console.log('index saga');
}