import Api from '../../api';
import storageUtil from '../../utility/storage.util';
import transformerutil from '../../utility/transformer.util';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/index.actions';

export function* fetchHandler () {
  yield put(actions.showLoader());
  let response;
  try {
    response = yield call(Api.getNote);
  } catch (err) {
    response = yield call(storageUtil.getItem, 'notes');
  }
  yield put(actions.populateNote(response));
  yield put(actions.hideLoader());
}

export function* saveHandler (action) {
  yield put(actions.showLoader());
  try {
    const noteWithID = yield call(Api.addNote, action.payload);
    const currentNotes = yield select(storageUtil.getStore);
    const newNotes = [...currentNotes, noteWithID];
    yield call(storageUtil.setItem, 'notes', newNotes);
    yield put(actions.addNote(noteWithID));
  } catch (err) {
    Alert.alert(
      'Error',
      err.message,
      [
        {text: 'Ask me later'},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK'}
      ],
      {cancelable: false}
    );
  }
  yield put(actions.hideLoader());
}

export function* deleteHandler (action) {
  yield put(actions.showLoader());
  const item = action.payload;
  try {
    yield call(Api.deleteNote, item);
    const currentNotes = yield select(storageUtil.getStore);
    const filterNotes = yield call(transformerutil.deleteItem, currentNotes, item);
    yield put(actions.populateNote(filterNotes));
    yield call(storageUtil.setItem, 'notes', filterNotes);
  } catch (err) {
    Alert.alert(
      'Error',
      err.message,
      [
        {text: 'Ask me later'},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK'}
      ],
      {cancelable: false}
    );
  }
  yield put(actions.hideLoader());
}
  
export default function* notes () {

  yield takeEvery(actions.FETCH_NOTE, fetchHandler);
  yield takeLatest(actions.ADD_NOTE_REQUEST, saveHandler);
  yield takeLatest(actions.DELETE_NOTE_REQUEST, deleteHandler);
}