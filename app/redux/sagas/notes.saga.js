import ApiNotes from '../../api';
import {Alert} from 'react-native';
import {call, put,  select, take, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {filterNote, getSelector} from '../../utils/transformerutil';
import {getItemToStorage, setItemToStorage} from '../../utils/storageutil';
import * as actions from '../actions/index.actions';

export const noteSelector = getSelector('notes');
export  function* fetchHandler () {
  yield put(actions.showLoader());
  yield call(delay, 2000);
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
export function* addNoteHandler (action) {
  yield put(actions.showLoader());
  try {
    const note = action.payload;
    const noteWithId = yield call(ApiNotes.addNote, note);
    const currentNote = yield select(noteSelector);
    const newNote = [...currentNote, noteWithId];
    yield put(actions.addNote(noteWithId)); 
    yield call(setItemToStorage, 'storageNote', newNote);
  } catch (error) {
    yield call(Alert.alert, 'Save Failed', 
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
export function* deleteNoteHandler (action) {
  yield put(actions.showLoader());
  try {
    const itemId = action.payload;
    yield call(ApiNotes.deleteNote, itemId);
    yield put(actions.deleteNote(itemId)); 
    const currentNote = yield select(noteSelector);
    const remainNote = yield call(filterNote, currentNote, itemId);
    yield call(setItemToStorage, 'storageNote', remainNote);
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
export default function* notes () {
  yield take(actions.fetchNotes);
  yield call(fetchHandler);

  yield takeLatest(actions.ADD_NOTE_REQUEST, addNoteHandler);
  yield takeLatest(actions.DELETE_NOTE_REQUEST, deleteNoteHandler);
}