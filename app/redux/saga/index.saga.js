import Api from '../../api';
import storageUtil from '../../utility/storage.util';
import transformerutil from '../../utility/transformer.util';
import {Alert} from 'react-native';
import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/index.actions';

function* fetchHandler () {
  yield put(actions.showLoader());
  let response;
  try {
    response = yield call(Api.getNote);
  } catch (err) {
    response = yield call(storageUtil.getItem, 'notes');
  }
  yield put(actions.showNote(response));
  yield put(actions.hideLoader());
}

function* saveHandler (action) {
  yield put(actions.showLoader());
  try {
    const noteWithID = yield call(Api.addNote, action.payload);
    const currentNotes = yield select((store) => (store.notes));
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

function* deleteHandler (action) {
  yield put(actions.showLoader());
  const item = action.payload;
  try {
    yield call(Api.deleteNote, item);
    const currentNotes = yield select((store) => (store.notes));
    const filterNotes = yield call(transformerutil.deleteItem, currentNotes, item.id);
    yield call(storageUtil.setItem, 'notes', filterNotes);
    yield put(actions.deleteNote(filterNotes));
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
  yield takeEvery('FETCH_NOTE', fetchHandler);
  yield takeLatest('ADD_NOTE_REQUEST', saveHandler);
  yield takeLatest('DELETE_NOTE_REQUEST', deleteHandler);
}