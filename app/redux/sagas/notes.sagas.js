import ApiNotes from '../../api';
import notesUtil from '../../utils/transfromer.util';
import storage from '../../utils/storage.util';
import {call, put, take, takeEvery} from 'redux-saga/effects';
import * as actions from '../actions/index.actions';

function* getData () {
  try {
    const data = yield call(ApiNotes.getNotes);
    return data;
  } catch (err) {
    const data =  yield call(storage.getItem, 'notes');
    return data;
  }
}
export default function* notes () {
  yield take(actions.FETCH_NOTES);
  yield call(newFun);
  yield takeEvery(actions.ADD_NOTE_REQUEST, addNote);
  yield takeEvery(actions.DELETE_NOTE_SAGA, deleteNote);
}
export function* newFun () {
  yield put(actions.showLoader());
  const notes = yield call(getData);
  yield put(actions.populateNotes(notes));
  yield put(actions.hideLoader());
}
export function* addNote (action) {
  yield put(actions.showLoader());
  const response = yield call(ApiNotes.addNote, action.payload);
  yield put(actions.addNote(response));
  storage.setItem('notes', response);
  yield put(actions.hideLoader());
}
export function* deleteNote (action) {
  yield put(actions.showLoader());
  const response = yield call(ApiNotes.deleteNote, action.payload.id);
  yield call(storage.setItem, 'notes', response);
  yield put(action.populateNotes(response));
    
  yield put({
    type: 'Delete Failed',
    payload: response
  });
  storage.setItem('notes', notesUtil.deleteNote, response);
  yield put(actions.hideLoader());
}