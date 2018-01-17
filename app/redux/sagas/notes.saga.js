import ApiNotes from '../../api';
import Storage from '../../utility/storage.util';
import transformerutil from '../../utility/transformerutil';
import {
  Alert
} from 'react-native';
import {call, fork, put, select, takeEvery} from 'redux-saga/effects';
import * as actions from '../actions/index.actions';

const keysNote = 'notes';
export const selectFN = (store) => (store.notes);
export function* fetchHandler () {
  yield put(actions.showLoader());
  let notes;
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    notes = yield call(Storage.getItemsFromAsyncStorage, keysNote);
  }
  yield put(actions.populateNotes(notes));
  yield put(actions.hideLoader());
}

export function* saveHandler (action) {
  yield put(actions.showLoader());
  const note = action.payload;
  try {
    yield call(ApiNotes.addNote, note);
    const preNote = yield select(selectFN);
    const newNotes = [...preNote];
    newNotes.push(note);
    yield call(Storage.setItemsFromAsyncStorage, keysNote, JSON.stringify(newNotes));
    yield put(actions.populateNotes(newNotes));
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

export function* removeHandler (action) { // named export
  yield put(actions.showLoader());
  try {
    yield call(ApiNotes.deleteNote, action.payload.id);
    const preNotes = yield select(selectFN);
    const filteredNotes = yield call(transformerutil.deleteNote, preNotes, action.payload.id);
    yield call(Storage.setItemsFromAsyncStorage, keysNote, JSON.stringify(filteredNotes));
    yield put(actions.populateNotes(filteredNotes));
  } catch (error) {
    yield call(Alert.alert,
      'Delete Failed',
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
  
function* notes () {
  yield takeEvery(actions.FETCH_NOTES, fetchHandler);
  yield takeEvery(actions.ADD_NOTE_REQUEST, saveHandler);
  yield takeEvery(actions.REMOVE_NOTE_REQUEST, removeHandler);
  // console.log('This is call from FETCH_NOTES');
}

export default notes; // default: unnamed export