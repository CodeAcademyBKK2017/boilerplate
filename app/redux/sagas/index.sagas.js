import ApiNotes from '../../api';
import delay from 'redux-saga';
import notesUtil from '../../utils/transfromer.util';
import storage from '../../utils/storage.util';
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects';

function* getData () {
  try {
    const data = yield call(ApiNotes.getNotes);
    return data;
  } catch (err) {
    const data =  yield call(storage.getItem, 'notes');
    return data;
  }
}
function* notes () {
  yield take('FETCH_NOTES');
  yield call(newFun);
  yield takeEvery('ADD_NOTE_REQUEST', addNote);
  yield takeEvery('DELETE_NOTE_SAGA', deleteNote);
}
function* newFun () {
  yield put({
    type: 'SHOW_LOADER'
  });
  const notes = yield call(getData);
  yield put({
    type: 'POPULATE_NOTES',
    payload: notes
  });
  yield put({
    type: 'HIDE_LOADER'
  });
}
function* addNote (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  const response = yield call(ApiNotes.addNote, action.payload);
  yield put({
    type: 'ADD_NOTE',
    payload: response
  });
  storage.setItem('notes', response);
  yield put({
    type: 'HIDE_LOADER'
  });
}
function* deleteNote (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  const response = yield call(ApiNotes.deleteNote, action.payload.id);
  yield call(storage.setItem, 'notes', response);
  yield put({
    type: 'POPULATE_NOTES',
    payload: response
  });
    
  yield put({
    type: 'Delete Failed',
    payload: response
  });
  storage.setItem('notes', notesUtil.deleteNote, response);
  yield put({
    type: 'HIDE_LOADER'
  });
}
export default function* sagas () {
  yield fork(notes);
  console.log('index saga');
}