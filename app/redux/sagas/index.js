import ApiNotes from '../../api';
import {Alert} from 'react-native';
import {call, fork, put,  select, take, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {filterNote} from '../../utils/transformerutil';
import {getItemToStorage, setItemToStorage} from '../../utils/storageutil';
import * as actions from '../actions/index.actions';

function* fetchHandler () {
  yield put({
    type: actions.SHOW_LOADER
  });
  //  yield delay(1000);
  let response;
  try {
    response = yield call(ApiNotes.getNotes);
  } catch (error) {
    const storageData =  yield call(getItemToStorage, 'storageNote');
    response = storageData ? storageData : [];
  }
  yield put({
    type: actions.POPULATE_NOTES,
    payload: response
  });
  yield put({
    type: actions.HIDE_LOADER
  });
}
function* addNoteHandler (action) {
  yield put({
    type: actions.SHOW_LOADER
  });
  yield delay(1000);
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
  yield put({
    type: actions.HIDE_LOADER
  });
}
function* deleteNoteHandler (action) {
  yield put({
    type: actions.SHOW_LOADER
  });
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
  yield put({
    type: actions.HIDE_LOADER
  });
}
function* notes () {
//   yield takeEvery('FETCH_NOTES', fetchHandler);
// console.log('This is call from FETCH_NOTES');
  yield take(actions.FETCH_NOTES);
  yield fetchHandler();

  yield takeLatest(actions.addNoteRequest, addNoteHandler);
  yield takeLatest(actions.deleteNoteRequest, deleteNoteHandler);
}
export default function* sagas () {
  yield fork(notes);
  // console.log('index saga');
}